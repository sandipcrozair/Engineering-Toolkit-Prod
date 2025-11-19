import React, { useEffect } from "react";
import { Thermometer, Gauge, Zap, Eraser } from "lucide-react";
import BoilIcon from "../../../assets/boil.png";
import { useBoilingPointCalculator } from "../../../hooks/useBoilingPointCalculator";
import { BoilingPointHeader } from "./BoilingPointHeader";
import { SubstanceSelector } from "./SubstanceSelector";
import { InputCard } from "./InputCard";
import { ResultsDisplay } from "./ResultsDisplay";

export default function BoilingPointCalculator() {
  const {
    // State
    selectedSubstance,
    inputs,
    result,
    loading,
    error,
    isSubstanceOpen,
    groupedSubstances,
    selectedSubstanceData,

    // Functions
    handleSubstanceChange,
    handleInputChange,
    handleInputFocus,
    clearAll,
    toggleSubstanceDropdown,
    validationErrors,
    calculateBoilingPoint,
  } = useBoilingPointCalculator();

  // Auto-calculate when inputs change
  useEffect(() => {
    if (selectedSubstance && inputs.P1 && inputs.T1 && inputs.Hvap && (inputs.P2 || inputs.T2)) {
      const timer = setTimeout(() => {
        calculateBoilingPoint();
      }, 500); // Debounce calculation

      return () => clearTimeout(timer);
    }
  }, [inputs.P1, inputs.T1, inputs.Hvap, inputs.P2, inputs.T2, selectedSubstance]);

  // Input field configurations
  const knownValuesFields = [
    {
      field: "P1",
      label: "Pressure (P₁)",
      unit: "Torr",
      icon: Gauge,
      iconColor: "text-orange-500",
    },
    {
      field: "T1",
      label: "Temperature (T₁)",
      unit: "°C",
      icon: Thermometer,
      iconColor: "text-orange-500",
    },
    {
      field: "Hvap",
      label: "Enthalpy of Vaporization (ΔHvap)",
      unit: "kJ/mol",
      icon: Zap,
      iconColor: "text-orange-500",
    },
  ];

  const targetValuesFields = [
    {
      field: "P2",
      label: "Target Pressure (P₂)",
      unit: "Torr",
      icon: Gauge,
      iconColor: "text-red-500",
      helperText: "Enter P₂ to calculate T₂",
    },
    {
      field: "T2",
      label: "Target Temperature (T₂)",
      unit: "°C",
      icon: Thermometer,
      iconColor: "text-red-500",
      helperText: "Enter T₂ to calculate P₂",
    },
  ];

  // Check if form is valid for auto-calculation
  const isFormValid = () => {
    const hasRequiredFields = selectedSubstance && inputs.P1 && inputs.T1 && inputs.Hvap;
    const hasOneTarget = (inputs.P2 || inputs.T2) && !(inputs.P2 && inputs.T2);
    const noValidationErrors = Object.keys(validationErrors).length === 0;

    return hasRequiredFields && hasOneTarget && noValidationErrors;
  };

  return (
    <div className="w-full bg-gradient-to-br from-orange-50/50 via-red-50/30 to-amber-50/20 border border-white/50 overflow-hidden backdrop-blur-sm mx-auto py-3 px-2">
      {/* Header */}
      <BoilingPointHeader BoilIcon={BoilIcon} />

      <div className="p-2">
        {/* Substance Selection */}
        <SubstanceSelector
          selectedSubstance={selectedSubstance}
          selectedSubstanceData={selectedSubstanceData}
          isSubstanceOpen={isSubstanceOpen}
          groupedSubstances={groupedSubstances}
          onSubstanceChange={handleSubstanceChange}
          onToggleDropdown={toggleSubstanceDropdown}
          validationErrors={validationErrors}
        />

        {/* Input Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-4">
          {/* Known Values Card */}
          <InputCard
            title="Known Values"
            subtitle="Reference boiling point data"
            icon={Thermometer}
            gradient="bg-gradient-to-r from-orange-500 to-red-500"
            fields={knownValuesFields}
            inputs={inputs}
            onInputChange={handleInputChange}
            onInputFocus={handleInputFocus}
            validationErrors={validationErrors}
            focusColor="focus:ring-orange-500"
          />

          <InputCard
            title="Find Unknown"
            subtitle="Enter one value to calculate the other"
            icon={Gauge}
            gradient="bg-gradient-to-r from-red-500 to-pink-500"
            fields={targetValuesFields}
            inputs={inputs}
            onInputChange={handleInputChange}
            onInputFocus={handleInputFocus}
            validationErrors={validationErrors}
            focusColor="focus:ring-red-500"
            showHelperText={true}
            clearAll={clearAll}
          />
        </div>

        {/* Clear Button */}
       

        {/* Auto-calculation Status */}
        {/* {isFormValid() && (
          <div className="text-center p-2 bg-blue-50/80 border border-blue-200 rounded-md backdrop-blur-sm mb-4">
            <p className="text-blue-700 text-xs font-medium">
              💡 Auto-calculating... {inputs.P2 ? "Temperature (T₂)" : "Pressure (P₂)"} will update automatically
            </p>
          </div>
        )} */}

        {/* Validation and Error Messages */}
        <div className="space-y-2">
          {/* Helper Text */}
          {/* {(inputs.P2 || inputs.T2) &&
            !(inputs.P2 && inputs.T2) &&
            isFormValid() && (
              <div className="text-center p-2 bg-green-50/80 border border-green-200 rounded-md backdrop-blur-sm">
                <p className="text-green-700 text-xs font-medium">
                  ✅ Ready! Calculating {inputs.P2 ? "temperature (T₂)" : "pressure (P₂)"} automatically
                </p>
              </div>
            )} */}

          {/* Validation Issues */}
          {/* {!isFormValid() && (inputs.P2 || inputs.T2) && (
            <div className="text-center p-2 bg-amber-50/80 border border-amber-200 rounded-md backdrop-blur-sm">
              <p className="text-amber-700 text-xs font-medium">
                ⚠️ {!selectedSubstance
                  ? "Please select a substance"
                  : !inputs.P1
                  ? "Please fill Pressure (P₁)"
                  : !inputs.T1
                  ? "Please fill Temperature (T₁)"
                  : !inputs.Hvap
                  ? "Please fill Enthalpy of Vaporization (ΔHvap)"
                  : inputs.P2 && inputs.T2
                  ? "Please enter only one target value (P₂ or T₂)"
                  : "Complete all required fields for auto-calculation"}
              </p>
            </div>
          )} */}

          {/* Error Display */}
          {/* {error && (
            <div className="text-center p-2 bg-red-50/80 border border-red-200 rounded-md backdrop-blur-sm">
              <p className="text-red-700 text-xs font-medium">❌ {error}</p>
            </div>
          )} */}
        </div>

        {/* Results Display */}
        {/* <ResultsDisplay loading={loading} result={result} error={error} /> */}
      </div>
    </div>
  );
}