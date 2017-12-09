(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global['@phosphorwc/widget'] = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var REQUIRED_ATTRIBUTES = [
        "data-title"
    ];
    var PhosphorWidget = /** @class */ (function (_super) {
        __extends(PhosphorWidget, _super);
        function PhosphorWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PhosphorWidget, "is", {
            get: function () {
                return "phosphor-widget";
            },
            enumerable: true,
            configurable: true
        });
        PhosphorWidget.prototype.connectedCallback = function () {
            var _this = this;
            REQUIRED_ATTRIBUTES.forEach(function (attrName) {
                if (!_this.hasAttribute(attrName)) {
                    console.warn("Removing " + _this.tagName + "[id=" + (_this.id || _this.getAttribute("data-title") || "UNKNOWN") + "] becuase " + attrName + " is not present");
                    _this.remove();
                }
            });
        };
        return PhosphorWidget;
    }(HTMLElement));
    var index = customElements.define(PhosphorWidget.is, PhosphorWidget);

    exports.REQUIRED_ATTRIBUTES = REQUIRED_ATTRIBUTES;
    exports.PhosphorWidget = PhosphorWidget;
    exports['default'] = index;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
