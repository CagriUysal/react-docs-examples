import React, { useState } from "react";
import ReactDOM from "react-dom";

// ** UTILS **

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

// ** Components **

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

function TemperatureInput({ temperature, onTemperatureChange, scale }) {
  const handleChange = (e) => onTemperatureChange(e.target.value);

  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  );
}

function Calculator() {
  const [temperature, setTemperature] = useState({
    temperature: 0,
    scale: "c",
  });

  const handleCelciusChange = (temperature) => {
    setTemperature({ scale: "c", temperature });
  };

  const handleFahrenheitChange = (temperature) => {
    setTemperature({ scale: "f", temperature });
  };

  const { scale, temperature: temp } = temperature;
  const celsius = scale === "f" ? tryConvert(temp, toCelsius) : temp;
  const fahrenheit = scale === "c" ? tryConvert(temp, toFahrenheit) : temp;

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelciusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={celsius} />
    </div>
  );
}

function App() {
  return <Calculator />;
}

ReactDOM.render(<App />, document.getElementById("root"));
