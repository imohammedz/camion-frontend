// src/components/CreateAdvertisementPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAdvertisementPage: React.FC = () => {
  const [adName, setAdName] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [budget, setBudget] = useState("");
  const [truckId, setTruckId] = useState("");
  const [adContent, setAdContent] = useState("");
  const [adType, setAdType] = useState("Banner");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !adName ||
      !company ||
      !startDate ||
      !endDate ||
      !truckId ||
      !adContent ||
      !budget
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`Advertisement "${adName}" created for truck "${truckId}".`);
    // Further processing logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Advertisement</h1>
      <form onSubmit={handleSubmit}>
        {/* Advertisement Details */}
        <div className="form-group mb-4">
          <label>Advertisement Name:</label>
          <input
            type="text"
            className="form-control"
            value={adName}
            onChange={(e) => setAdName(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Company:</label>
          <input
            type="text"
            className="form-control"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>End Date:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Budget:</label>
          <input
            type="number"
            className="form-control"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Target Audience:</label>
          <input
            type="text"
            className="form-control"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />
        </div>

        {/* Truck and Content Details */}
        <div className="form-group mb-4">
          <label>Truck ID:</label>
          <input
            type="text"
            className="form-control"
            value={truckId}
            onChange={(e) => setTruckId(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Advertisement Content:</label>
          <textarea
            className="form-control"
            value={adContent}
            onChange={(e) => setAdContent(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>Advertisement Type:</label>
          <select
            className="form-control"
            value={adType}
            onChange={(e) => setAdType(e.target.value)}
          >
            <option value="Banner">Banner</option>
            <option value="Digital">Digital</option>
            <option value="Wrap">Wrap</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Create Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdvertisementPage;
