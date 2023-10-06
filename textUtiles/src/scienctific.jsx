import React from "react";
import "./App.css"
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import 'bootstrap/dist/css/bootstrap.min.css';


export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: "choose-operation",
    CLEAR: "clear",
    DELETE_DIGIT: "delete-digit",
    EVALUATE: "evaluate",
  }

  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
          }
        }
        if (payload.digit === "0" && state.currentOperand === "0") {
          return state
        }
        if (payload.digit === "." && state.currentOperand.includes(".")) {
          return state
        }
  
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) {
          return state
        }
  
        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }
  
        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          }
        }
  
        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null,
        }
      case ACTIONS.CLEAR:
        return {}
      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null,
          }
        }
        if (state.currentOperand == null) return state
        if (state.currentOperand.length === 1) {
          return { ...state, currentOperand: null }
        }
  
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        }
      case ACTIONS.EVALUATE:
        if (
          state.operation == null ||
          state.currentOperand == null ||
          state.previousOperand == null
        ) {
          return state
        }
  
        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state),
        }
    }
  }

  function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev * current
        break
      case "÷":
        computation = prev / current
        break
    }
  
    return computation.toString()
  }
  
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })
  function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }

function Sapp () {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
        reducer,
        {}
    )
    return (
        <>
        {/* navbar start */}
        <div className="navbar"></div>
        {/* navbar end */}

        {/* calculator start */}
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-output"></div>
                <div className="current-output"></div>
            </div>
            <OperationButton operation="sin" dispatch={dispatch} />
            <OperationButton operation="cos" dispatch={dispatch} />
            <OperationButton operation="tan" dispatch={dispatch} />
            <OperationButton operation="rad" dispatch={dispatch} />
            <OperationButton operation="deg" dispatch={dispatch} />
            <OperationButton operation="log" dispatch={dispatch} />
            <OperationButton operation="In" dispatch={dispatch} />
            <button value="("></button>
            <button value=")"></button>
            <OperationButton operation="inv" dispatch={dispatch} />
            <OperationButton operation="!" dispatch={dispatch} />
            <button className='clear' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>C</button>
            <OperationButton operation="%" dispatch={dispatch} />
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
            <OperationButton operation="^" dispatch={dispatch} />
            <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
            <button>*</button>
            <button>root</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>-</button>
            <button>Pi</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>e</button>
            <button>00</button>
            <button>0</button>
            <button>0</button>
            <button>.</button>
            <button>=</button>
        </div>
        {/* calculator end */}
        </>
    )
}