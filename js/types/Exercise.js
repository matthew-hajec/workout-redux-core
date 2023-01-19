"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = exports.Size = exports.TrackingType = void 0;
var TrackingType;
(function (TrackingType) {
    TrackingType[TrackingType["Reps"] = 0] = "Reps";
    TrackingType[TrackingType["Time"] = 1] = "Time";
})(TrackingType = exports.TrackingType || (exports.TrackingType = {}));
var Size;
(function (Size) {
    Size[Size["Small"] = 0] = "Small";
    Size[Size["Medium"] = 1] = "Medium";
    Size[Size["Large"] = 2] = "Large";
})(Size = exports.Size || (exports.Size = {}));
var Equipment;
(function (Equipment) {
    Equipment[Equipment["Barbell"] = 0] = "Barbell";
    Equipment[Equipment["Dumbbell"] = 1] = "Dumbbell";
    Equipment[Equipment["Machine"] = 2] = "Machine";
    Equipment[Equipment["Bodyweight"] = 3] = "Bodyweight";
    Equipment[Equipment["Other"] = 4] = "Other";
})(Equipment = exports.Equipment || (exports.Equipment = {}));
