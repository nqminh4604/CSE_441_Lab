import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import {useState} from 'react';


export default App = () => {

  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState("");

  const handleNumberInput = (num : Number) => {
    if (displayValue === "0") {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorInput = (operator : String) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue("0");
  }

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    if (operator === "+") {
      setDisplayValue((num1 + num2).toString());
    } else if (operator === "-") {
      setDisplayValue((num1 - num2).toString());
    } else if (operator === "*") {
      setDisplayValue((num1 * num2).toString());
    } else if (operator === "/") {
      setDisplayValue((num1 / num2).toString());
    }

    setOperator(null);
    setFirstValue("");
  };

  const handleClear = () => {
    setOperator(null);
    setFirstValue("");
    setDisplayValue("0");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayValue}>{displayValue}</Text>
      </View>
      <View style={styles.normalRow}>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberInput(7)}><Text style={styles.numberText}>7</Text></TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberInput(8)}><Text style={styles.numberText}>8</Text></TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberInput(9)}><Text style={styles.numberText}>9</Text></TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperatorInput("/")}><Text style={styles.operatorText}>÷</Text></TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberInput(4)}><Text style={styles.numberText}>4</Text></TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberInput(5)}><Text style={styles.numberText}>5</Text></TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberInput(6)}><Text style={styles.numberText}>6</Text></TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperatorInput("*")}><Text style={styles.operatorText}>x</Text></TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberInput(1)}><Text style={styles.numberText}>1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberInput(2)}><Text style={styles.numberText}>2</Text></TouchableOpacity>
        <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberInput(3)}><Text style={styles.numberText}>3</Text></TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperatorInput("-")}><Text style={styles.operatorText}>-</Text></TouchableOpacity>
        <TouchableOpacity style={styles.numberZero} onPress={() => handleNumberInput(0)}><Text style={styles.numberText}>0</Text></TouchableOpacity>
        <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperatorInput("+")}><Text style={styles.operatorText}>+</Text></TouchableOpacity>
        <TouchableOpacity style={styles.equalButton} onPress={() => handleEqual()}><Text style={styles.equal}>=</Text></TouchableOpacity>
        </View>
        <View style={styles.clearView}>
        <TouchableOpacity style={styles.clearButton} onPress={() => handleClear()}><Text style={styles.numberText}>C</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
  );

};