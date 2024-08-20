// src/components/CreateOrderPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateOrderPage: React.FC = () => {
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [orderId, setOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [packageType, setPackageType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [serviceType, setServiceType] = useState("Standard");
  const [insurance, setInsurance] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dimensions || !weight || !orderId || !customerName || !contactInfo) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(
      `Order created with Dimensions: ${dimensions}, Weight: ${weight}, OrderId: ${orderId}`
    );
    // Further processing logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Order</h1>
      <form onSubmit={handleSubmit}>
        {/* Customer Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Customer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label>Customer Name:</label>
              <input
                type="text"
                className="form-control"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact Info:</label>
              <input
                type="text"
                className="form-control"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Billing Address:</label>
              <input
                type="text"
                className="form-control"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Shipping Address:</label>
              <input
                type="text"
                className="form-control"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Shipment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label>Pickup Location:</label>
              <input
                type="text"
                className="form-control"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Destination Location:</label>
              <input
                type="text"
                className="form-control"
                value={destinationLocation}
                onChange={(e) => setDestinationLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Shipment Date:</label>
              <input
                type="date"
                className="form-control"
                value={shipmentDate}
                onChange={(e) => setShipmentDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Delivery Date:</label>
              <input
                type="date"
                className="form-control"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Package Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label>Package Type:</label>
              <input
                type="text"
                className="form-control"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Dimensions:</label>
              <input
                type="text"
                className="form-control"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Weight:</label>
              <input
                type="text"
                className="form-control"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Service Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label>Service Type:</label>
              <select
                className="form-control"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
                <option value="Overnight">Overnight</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                Insurance:
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={insurance}
                  onChange={(e) => setInsurance(e.target.checked)}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Order Details</h2>
          <div className="form-group">
            <label>OrderId:</label>
            <input
              type="text"
              className="form-control"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
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
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderPage;
