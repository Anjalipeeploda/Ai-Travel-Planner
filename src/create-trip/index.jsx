import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "../constants/options";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet,
  FaUsers,
} from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [days, setDays] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedTraveler, setSelectedTraveler] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${codeResp.access_token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          setOpenDialog(false);
        })
        .catch((err) => console.error("Failed to fetch user profile", err));
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  const onGenerateTrips = async () => {
    const user = localStorage.getItem("user");
    if (!user) return setOpenDialog(true);
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    )
      return toast.error("Please fill all the trip details.");
    if (formData?.noOfDays > 20)
      return toast.warning("Trip can't be more than 20 days.");

    setLoading(true);
    const timeout = setTimeout(
      () => toast.info("Still generating your trip... hang tight ✨"),
      6000
    );

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripText = result?.response?.text();
      toast.success("Trip generated successfully! ✈️");
      await saveAiTrip(tripText);
    } catch (error) {
      toast.error("Failed to generate trip.");
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  const saveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 relative flex justify-center">
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex justify-center items-center">
          <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-blue-700 text-center text-[#D41C1C]">
          Plan Your Dream Trip 🤖🌍
        </h1>
        <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
          Fill in a few preferences and let our AI craft the perfect itinerary
          for you.
        </p>

        <div className="px-5 sm:px-8 md:px-10 lg:px-12 max-w-3xl mx-auto mt-10 ">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-blue-700 text-center">
            <FaMapMarkerAlt className="text-blue-600" /> Where do you want to
            go?
          </h2>

          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              placeholder: "Search destination...",
            }}
          />
        </div>

        <div className="mb-10 max-w-xs mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-blue-700 text-center">
            <FaCalendarAlt className="text-blue-600" /> How many days are you
            planning your trip?
          </h2>
          <Input
            type="number"
            min="1"
            placeholder="Ex. 5"
            value={days}
            onChange={(e) => {
              setDays(e.target.value);
              handleInputChange("noOfDays", e.target.value);
            }}
            className="w-full  "
          />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-blue-700 text-center">
            <FaWallet className="text-blue-600" /> What's your budget?
          </h2>
          <div className="grid grid-cols-3 gap-[1.25rem] mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedBudget(item.title);
                  handleInputChange("budget", item.title);
                }}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  selectedBudget === item.title
                    ? "ring-2 ring-blue-500 scale-105"
                    : ""
                }`}
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-blue-700 text-center">
            <FaUsers className="text-blue-600" /> Who are you traveling with?
          </h2>
          <div className="grid grid-cols-3 gap-[1.25rem] mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedTraveler(item.title);
                  handleInputChange("traveler", item.people);
                }}
                className={`p-5 border rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-lg cursor-pointer transition text-center ${
                  selectedTraveler === item.title
                    ? "ring-2 ring-blue-500 scale-105"
                    : ""
                }`}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 justify-end flex">
          <Button
            disabled={loading}
            onClick={onGenerateTrips}
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-md"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Login Required
            </DialogTitle>
            <DialogDescription className="mt-3 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex items-center gap-2">
                  <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
                  <span className="text-xl font-bold text-blue-600">
                    TravelGenie
                  </span>
                </div>
              </div>
              <div className="text-center">
                <h2 className="font-bold text-lg mb-1">Sign In With Google</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Sign in to the app securely using your Google account.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={login}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex gap-2 items-center"
                >
                  <FcGoogle className="h-[1.5rem] w-[1.5rem]" />
                  Sign In With Google
                </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
