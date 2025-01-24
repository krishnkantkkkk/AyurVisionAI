import React, { useEffect, useState } from "react";

function PatientAnalysis() {
  const [patientData, setPatientData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getReport = async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    
    if (!baseUrl) {
      setError("API base URL is not configured");
      setIsLoading(false);
      return;
    }

    const cleanBaseUrl = baseUrl.replace(/;+$/, '');
    const apiUrl = `${cleanBaseUrl}/api/uploadImage/analysis`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: "678b9b784ac00cae0fdc20ce" })
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log(data.image);

      setPatientData(data);
      
      // Parse the content string into JSON object
      // try {
      //   const analysisResult = JSON.parse(data.choices[0].message.content);
      //   setPatientData(analysisResult);
      // } catch (err) {
      //   throw new Error(`Failed to parse analysis result: ${err.message}`);
      // }
    } catch (err) {
      console.error("Error fetching report:", err);
      setError(`Failed to load patient analysis: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading patient analysis...</div>
      </div>
    );
  }
    return (
      <div className="bg-gray-100 min-h-screen p-6" id="patientAnalysis">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patient Analysis</h1>
        <p className="text-gray-600">Review and analyze patient health data</p>
      </div>

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Details */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-lg border border-neutral-200/30 bg-white">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="Patient"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">Happy Lakhotia</h3>
                <p className="text-gray-500">ID: #PAT-2024-001</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Age</span>
                <span className="font-medium">20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender</span>
                <span className="font-medium">Male</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Visit</span>
                <span className="font-medium">Jan 19, 2025</span>
              </div>
            </div>

            {/* Remedies Section */}
            <div className="mt-6 p-4 bg-teal-50 rounded-lg">
              <h3 className="font-medium text-teal-700">Remedies</h3>
              <ul className="mt-2 space-y-1 text-sm text-teal-600 font-bold">
                <li>• {patientData.remedy[0]}</li>
                <li>• {patientData.remedy[1]}</li>
                <li>• {patientData.remedy[2]}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Condition Information Section */}
            <div className="flex-1 p-6 bg-blue-50 rounded-lg shadow-md">
              <h3 className="font-medium text-blue-700 text-xl mb-4">Condition Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-blue-200 pb-4">
                  <span className="text-gray-700">
                    {patientData.about[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-blue-200 pb-4">
                  <span className="text-gray-700">
                  {patientData.about[1]}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-blue-200 pb-4">
                  <span className="text-gray-700">
                  {patientData.about[2]}
                  </span>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h3 className="font-medium text-gray-800 text-xl mb-4">Infection Image</h3>
              <img
                src={patientData.image}
                alt="Condition"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Causes Section */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-700">
              Causes
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {patientData.causes[0]}
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {patientData.causes[1]}
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {patientData.causes[2]}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientAnalysis;