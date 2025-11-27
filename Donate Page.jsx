import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure correct import

const DonatePage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false); // State to show QR after clicking "Donate Now"

  useEffect(() => {
    const fetchCampaign = async () => {
      const docRef = doc(db, "campaigns", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCampaign(docSnap.data());
      } else {
        console.log("No such campaign!");
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDonation = () => {
    setShowQR(true); // Show QR Code when "Donate Now" is clicked
  };

  if (!campaign) return <div>Loading campaign...</div>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold">{campaign.title}</h1>
      <p className="text-gray-600">{campaign.description}</p>
      <p className="text-lg font-semibold mt-2">Target: ₹{campaign.targetAmount}</p>

      {/* Payment Section */}
      <div className="mt-6 w-full max-w-md">
        <label className="label font-semibold">Enter Donation Amount (₹)</label>
        <input 
          type="number" 
          className="input input-bordered w-full"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button 
          className="btn btn-primary w-full mt-4" 
          onClick={handleDonation}
          disabled={!amount}
        >
          Donate Now
        </button>

        {/* Show QR Code after clicking Donate Now */}
        {showQR && (
          <div className="mt-6 text-center">
            {campaign.qrCode ? (
              <>
                <p className="font-semibold">Scan & Pay via GPay:</p>
                <div className="w-48 h-48 bg-gray-200 rounded-lg mt-2 flex items-center justify-center mx-auto">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <p className="text-sm text-gray-600">QR Code</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-red-500 font-semibold">No QR code available. Please donate via bank transfer.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonatePage;

