"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const workoutSlice_1 = __importDefault(require("../features/workoutSlice"));
exports.default = () => (0, toolkit_1.configureStore)({
    reducer: {
        workout: workoutSlice_1.default,
    },
});
