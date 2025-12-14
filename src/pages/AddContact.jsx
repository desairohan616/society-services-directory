import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Toast from "../components/Toast";

export default function AddContact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    category: "Doctor",
    doctorType: "",
    maidType: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [phoneError, setPhoneError] = useState("");
  const [isContactPickerSupported, setIsContactPickerSupported] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Check if Contact Picker API is supported
  useEffect(() => {
    const checkContactPickerSupport = () => {
      // Check for Contact Picker API support
      // The API is available in Chrome/Edge on Android and Safari on iOS 13+
      const hasContactsAPI = 
        ('contacts' in navigator && 'select' in navigator.contacts) ||
        ('contacts' in navigator && typeof navigator.contacts.select === 'function');
      
      setIsContactPickerSupported(hasContactsAPI);
    };
    checkContactPickerSupport();
  }, []);

  // Validate phone number (Indian format: 10 digits starting with 6-9)
  const validatePhoneNumber = (phone) => {
    // Remove all non-digit characters
    const cleanedPhone = phone.replace(/\D/g, "");
    
    // Check if it's a valid Indian phone number
    // Indian mobile numbers: 10 digits starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;
    
    if (cleanedPhone.length === 0) {
      return { isValid: false, error: "" };
    }
    
    if (cleanedPhone.length !== 10) {
      return { isValid: false, error: "Phone number must be 10 digits" };
    }
    
    if (!phoneRegex.test(cleanedPhone)) {
      return { isValid: false, error: "Please enter a valid phone number" };
    }
    
    return { isValid: true, error: "", cleaned: cleanedPhone };
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, phone: value });
    
    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError("");
    }
  };

  // Function to extract phone number from contact
  const extractPhoneNumber = (contact) => {
    if (!contact.tel || contact.tel.length === 0) {
      return null;
    }
    
    // Get the first phone number
    let phoneNumber = contact.tel[0];
    
    // Handle different phone number formats
    if (typeof phoneNumber === 'string') {
      // Clean the phone number (remove spaces, dashes, etc.)
      return phoneNumber.replace(/\s+/g, '').replace(/-/g, '');
    } else if (Array.isArray(phoneNumber)) {
      // If it's an array, get the first element
      if (phoneNumber.length > 0) {
        const num = phoneNumber[0];
        return typeof num === 'string' ? num.replace(/\s+/g, '').replace(/-/g, '') : num;
      }
    } else if (phoneNumber && typeof phoneNumber === 'object') {
      // Some APIs return objects with a 'value' property
      if (phoneNumber.value) {
        return phoneNumber.value.replace(/\s+/g, '').replace(/-/g, '');
      }
    }
    
    return null;
  };

  // Function to import contact from device contacts
  const importFromContacts = async () => {
    if (!isContactPickerSupported) {
      setToastMessage("Contact picker is not supported in your browser. Please enter details manually.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    setIsImporting(true);
    
    try {
      // Request contact selection
      // The API might return a promise or use different method names
      let contacts;
      
      if (navigator.contacts && typeof navigator.contacts.select === 'function') {
        contacts = await navigator.contacts.select(['name', 'tel'], { multiple: false });
      } else {
        throw new Error('Contact Picker API not available');
      }
      
      if (contacts && contacts.length > 0) {
        const contact = contacts[0];
        
        // Extract name - handle different formats
        let contactName = '';
        if (contact.name) {
          if (Array.isArray(contact.name)) {
            contactName = contact.name[0] || '';
          } else if (typeof contact.name === 'string') {
            contactName = contact.name;
          } else if (contact.name.length > 0) {
            contactName = contact.name[0] || '';
          }
        }
        
        // Extract phone number
        const phoneNumber = extractPhoneNumber(contact);
        
        if (!phoneNumber) {
          setToastMessage("Selected contact doesn't have a phone number. Please enter manually.");
          setToastType("error");
          setShowToast(true);
          setIsImporting(false);
          return;
        }
        
        // Pre-fill the form
        setForm({
          ...form,
          name: contactName || "",
          phone: phoneNumber,
        });
        
        // Clear any existing phone errors
        setPhoneError("");
        
        setToastMessage("Contact imported successfully! Please review and complete the form.");
        setToastType("success");
        setShowToast(true);
      } else {
        // User cancelled the contact picker
        setIsImporting(false);
      }
    } catch (error) {
      console.error("Error importing contact:", error);
      
      // Handle specific error cases
      if (error.name === 'NotSupportedError' || error.name === 'SecurityError') {
        setToastMessage("Unable to access contacts. Please check browser permissions or enter details manually.");
      } else if (error.name === 'AbortError') {
        // User cancelled - don't show error
        setIsImporting(false);
        return;
      } else {
        setToastMessage("Failed to import contact. Please try again or enter details manually.");
      }
      
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsImporting(false);
    }
  };

  const checkDuplicateContact = async (phone) => {
    const { data, error } = await supabase
      .from("contacts")
      .select("id, name, phone")
      .eq("phone", phone);
    
    if (error) {
      console.error("Error checking duplicate:", error);
      return false;
    }
    
    return data && data.length > 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.name.trim() || !form.phone.trim()) {
      setToastMessage("Please fill in all required fields");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Validate doctor type if category is Doctor
    if (form.category === "Doctor" && !form.doctorType) {
      setToastMessage("Please select a doctor type");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Validate maid type if category is Maid
    if (form.category === "Maid" && !form.maidType) {
      setToastMessage("Please select a maid type");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Validate phone number
    const phoneValidation = validatePhoneNumber(form.phone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error || "Please enter a valid phone number");
      setToastMessage(phoneValidation.error || "Please enter a valid phone number");
      setToastType("error");
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check for duplicate contact
      const isDuplicate = await checkDuplicateContact(phoneValidation.cleaned);
      if (isDuplicate) {
        setToastMessage("This contact already exists. Please check the phone number.");
        setToastType("error");
        setShowToast(true);
        setIsSubmitting(false);
        return;
      }

      // Prepare form data with cleaned phone number
      // If Doctor category is selected and doctorType is provided, append it to description
      // If Maid category is selected and maidType is provided, append it to description
      let finalDescription = form.description;
      if (form.category === "Doctor" && form.doctorType) {
        finalDescription = form.description 
          ? `${form.doctorType}${form.description ? ` - ${form.description}` : ''}`
          : form.doctorType;
      } else if (form.category === "Maid" && form.maidType) {
        finalDescription = form.description 
          ? `${form.maidType}${form.description ? ` - ${form.description}` : ''}`
          : form.maidType;
      }

      const formData = {
        name: form.name,
        phone: phoneValidation.cleaned,
        category: form.category,
        description: finalDescription,
      };

      const { error } = await supabase.from("contacts").insert(formData);
      
      if (error) {
        console.error("Error adding contact:", error);
        setToastMessage("Failed to add contact. Please try again.");
        setToastType("error");
        setShowToast(true);
        setIsSubmitting(false);
        return;
      }

      // Show success notification
      setToastMessage("Contact added successfully!");
      setToastType("success");
      setShowToast(true);
      
      // Reset form
      setForm({
        name: "",
        phone: "",
        category: "Doctor",
        doctorType: "",
        maidType: "",
        description: "",
      });
      setPhoneError("");

      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setToastMessage("An unexpected error occurred. Please try again.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
      />
      <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Add New Contact
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Share a useful contact with your society members
            </p>
          </div>

          {/* Import from Contacts Button - Only show if supported */}
          {isContactPickerSupported && (
            <div className="mb-4 sm:mb-6">
              <button
                type="button"
                onClick={importFromContacts}
                disabled={isImporting}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3.5 px-4 rounded-lg font-medium shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] text-base"
              >
                {isImporting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Importing...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Import from Contacts</span>
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Quickly import name and phone number from your device contacts
              </p>
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter contact name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={form.phone}
                onChange={handlePhoneChange}
                className={`w-full border rounded-lg px-4 py-3.5 text-base focus:outline-none focus:ring-2 transition-all ${
                  phoneError
                    ? "border-red-500 focus:ring-red-500 focus:border-transparent"
                    : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                }`}
                required
                autoComplete="tel"
                inputMode="numeric"
              />
              {phoneError && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{phoneError}</span>
                </p>
              )}
              {!phoneError && form.phone && (
                <p className="mt-1 text-xs text-gray-500">
                  Enter a 10-digit Indian mobile number
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                value={form.category}
                onChange={(e) => {
                  const newCategory = e.target.value;
                  setForm({ 
                    ...form, 
                    category: newCategory,
                    // Reset doctorType when category changes away from Doctor
                    doctorType: newCategory === "Doctor" ? form.doctorType : "",
                    // Reset maidType when category changes away from Maid
                    maidType: newCategory === "Maid" ? form.maidType : ""
                  });
                }}
              >
                <option value="Doctor">Doctor</option>
                <option value="Maid">Maid</option>
                <option value="Food">Food / Tiffin</option>
                <option value="Salon">Salon</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Grocery">Grocery</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {form.category === "Doctor" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Doctor Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={form.doctorType}
                  onChange={(e) => setForm({ ...form, doctorType: e.target.value })}
                  required
                >
                  <option value="">Select doctor type</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Ophthalmologist">Ophthalmologist</option>
                  <option value="ENT Specialist">ENT Specialist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                  <option value="Urologist">Urologist</option>
                  <option value="Oncologist">Oncologist</option>
                  <option value="Endocrinologist">Endocrinologist</option>
                  <option value="Pulmonologist">Pulmonologist</option>
                  <option value="Rheumatologist">Rheumatologist</option>
                  <option value="Nephrologist">Nephrologist</option>
                  <option value="Surgeon">Surgeon</option>
                  <option value="Homeopath">Homeopath</option>
                  <option value="Ayurvedic">Ayurvedic</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}

            {form.category === "Maid" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Maid Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={form.maidType}
                  onChange={(e) => setForm({ ...form, maidType: e.target.value })}
                  required
                >
                  <option value="">Select maid type</option>
                  <option value="Full Time Maid">Full Time Maid</option>
                  <option value="Part Time Maid">Part Time Maid</option>
                  <option value="Cooking Maid">Cooking Maid</option>
                  <option value="Cleaning Maid">Cleaning Maid</option>
                  <option value="Baby Sitter">Baby Sitter</option>
                  <option value="Elderly Care">Elderly Care</option>
                  <option value="Washing & Ironing">Washing & Ironing</option>
                  <option value="Deep Cleaning">Deep Cleaning</option>
                  <option value="Office Cleaning">Office Cleaning</option>
                  <option value="Car Cleaning">Car Cleaning</option>
                  <option value="Gardening">Gardening</option>
                  <option value="Driver">Driver</option>
                  <option value="Security Guard">Security Guard</option>
                  <option value="Cook">Cook</option>
                  <option value="Nanny">Nanny</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <textarea
                placeholder="Enter description or additional details"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows="4"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3.5 rounded-lg font-medium hover:bg-gray-50 active:bg-gray-100 active:scale-95 transition-all min-h-[44px] text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg min-h-[44px] text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Adding...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Add Contact</span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
