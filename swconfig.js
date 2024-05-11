/*! @preserve
 * bstreeview.js
 * Version: 1.2.1
 * Authors: Sami CHNITER <sami.chniter@gmail.com>
 * Copyright 2020
 * License: Apache License 2.0
 *
 * Project: https://github.com/chniter/bstreeview
 * Project: https://github.com/nhmvienna/bs5treeview (bootstrap 5)
 */
; 
(function ($, window, document, undefined) {
  "use strict";
  /**
   * Default bstreeview  options.
   */
  var pluginName = "bstreeview",
      defaults = {
        expandIcon: 'fa fa-angle-down fa-fw',
        collapseIcon: 'fa fa-angle-right fa-fw',
        expandClass: 'show',
        indent: 1.25,
        parentsMarginLeft: '1.25rem',
        openNodeLinkOnNewTab: true
    };
  /**
   * bstreeview HTML templates.
   */
  var templates = {
    treeview: '<div class="bstreeview"></div>',
    treeviewItem: '<div role="treeitem" class="list-group-item" data-bs-toggle="collapse"></div>',
    treeviewGroupItem: '<div role="group" class="list-group collapse" id="itemid"></div>',
    treeviewItemStateIcon: '<i class="state-icon"></i>',
    treeviewItemIcon: '<i class="item-icon"></i>'
  };

   /**
   * BsTreeview Plugin constructor.
   * @param {*} element
   * @param {*} options
   */

  function bstreeView(element, options) {
    this.element = element;
    this.itemIdPrefix = element.id + "-item-";
    this.settings = $.extend({}, defaults, options);
    this.init();
  }

   /**
   * Avoid plugin conflict.
   */

  $.extend(bstreeView.prototype, {

    /**
    * bstreeview intialize.
    */

    init: function () {
    this.tree = [];
    this.nodes = [];

        // Retrieve bstreeview Json Data.

        if (this.settings.data) {
            if (this.settings.data.isPrototypeOf(String)) {
                this.settings.data = $.parseJSON(this.settings.data);
              }
              this.tree = $.extend(true, [], this.settings.data);
              delete this.settings.data;
          }

          // Set main bstreeview class to element.

          $(this.element).addClass('bstreeview');
          this.initData({ nodes: this.tree });
          var _this = this;
          this.build($(this.element), this.tree, 0);

          // Update angle icon on collapse

          $(this.element).on('click', '.list-group-item', function (e) {
            $('.state-icon', this)
                .toggleClass(_this.settings.expandIcon)
                .toggleClass(_this.settings.collapseIcon);

              // navigate to href if present

              if (e.target.hasAttribute('href')) {
                  if (_this.settings.openNodeLinkOnNewTab) {
                    window.open(e.target.getAttribute('href'), '_blank');
                }
                  else {
                    window.location = e.target.getAttribute('href');
                }
              }
              else
              {
                  // Toggle the data-bs-target. Issue with Bootstrap toggle and dynamic code
                  $($(this).attr("data-bs-target")).collapse('toggle');
              }
          });
      },
      /**
       * Initialize treeview Data.
       * @param {*} node
       */
      initData: function (node) {
          if (!node.nodes) return;
          var parent = node;
          var _this = this;
          $.each(node.nodes, function checkStates(index, node) {

              node.nodeId = _this.nodes.length;
              node.parentId = parent.nodeId;
              _this.nodes.push(node);

              if (node.nodes) {
                  _this.initData(node);
              }
          });
      },

      /**
       * Build treeview.
       * @param {*} parentElement
       * @param {*} nodes
       * @param {*} depth
       */

      build: function (parentElement, nodes, depth) {
          var _this = this;

          // Calculate item padding.

          var leftPadding = _this.settings.parentsMarginLeft;

          if (depth > 0) {
            leftPadding = (_this.settings.indent + depth * _this.settings.indent).toString() + "rem;";
          }
          depth += 1;

          // Add each node and sub-nodes.

          $.each(nodes, function addNodes(id, node) {

          // Main node element.

              var treeItem = $(templates.treeviewItem)
                .attr('data-bs-target', "#" + _this.itemIdPrefix + node.nodeId)
                .attr('style', 'padding-left:' + leftPadding)
                .attr('aria-level', depth);

           // Set Expand and Collapse icones.

            if (node.nodes) {
                var treeItemStateIcon = $(templates.treeviewItemStateIcon)
                .addClass((node.expanded)?_this.settings.expandIcon:_this.settings.collapseIcon);
                treeItem.append(treeItemStateIcon);
            }

           // set node icon if exist.

            if (node.icon) {
                var treeItemIcon = $(templates.treeviewItemIcon)
                .addClass(node.icon);
                treeItem.append(treeItemIcon);
            }

              // Set node Text.

                treeItem.append(node.text);

              // Reset node href if present

            if (node.href) {
               treeItem.attr('href', node.href);
            }
              // Add class to node if present
              if (node.class) {
                treeItem.addClass(node.class);
              }
              // Add custom id to node if present
              if (node.id) {
                treeItem.attr('id', node.id);
              }

              // Attach node to parent.

              parentElement.append(treeItem);

              // Build child nodes.

              if (node.nodes) {

              // Node group item.

                var treeGroup = $(templates.treeviewGroupItem)
                .attr('id', _this.itemIdPrefix + node.nodeId);
                parentElement.append(treeGroup);
                _this.build(treeGroup, node.nodes, depth);
                if (node.expanded) {
                treeGroup.addClass(_this.settings.expandClass);
                }
              }
          });
      }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations

  $.fn[pluginName] = function (options) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" +
            pluginName, new bstreeView(this, options));
          }
      });
  };
})(jQuery, window, document);

function showMessage() {
    alert("Você tem certeza que deseja enviar as seguintes configurações globais ao DM2104?");
}

function gotoscriptpage () {

  // On click buttons will redirect to dm4370scriptgenerator page //

  window.location.href = "dm4370scriptgenerator.html"

}
  
//Block some inputs on the field, logic

const elementIds = ['circuito'];

for (const id of elementIds) {
  const element = document.getElementById(id);

  element.addEventListener('input', function() {
    const allowedChars = /[A0-Z9_]/; // Allowed characters (adjust as needed)
    let newInput = '';

    for (let char of this.value) { // Use 'this' to access current element's value
      if (allowedChars.test(char)) {
        newInput += char;
      }
    }

    element.value = newInput;
  });
}

// client input field exception
const cliente = document.getElementById('cliente');

cliente.addEventListener('input', function() {
  const allowedChars = /[A-Z0-9-_]/; // Allowed characters (adjust as needed)
  let newInput = '';

  for (let char of this.value) { // Use 'this' to access the cliente element's value
    if (allowedChars.test(char)) {
      newInput += char;
    }
  }

  cliente.value = newInput;
});

const vlan = document.getElementById('numerovlan');

vlan.addEventListener('input', function() {
  const allowedChars = /[0-9]/; // Allowed characters (adjust as needed)
  let newInput = '';

  for (let char of this.value) { // Use 'this' to access the cliente element's value
    if (allowedChars.test(char)) {
      newInput += char;
    }
  }
  vlan.value = newInput;
});



//checkboxes logic check
//checkboxes multiple selection

const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // Select all checkboxes
const phraseSpan = document.getElementById("changeable-phrase");

// Function to build the final phrase based on checked checkboxes
function buildFinalPhrase() {
  let finalPhrase = "";
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      finalPhrase += checkbox.value + " "; // Append checkbox value with space
    }
  });
  return finalPhrase.trim(); // Remove trailing space if any
}

// Event listener for all checkboxes (using a single function)
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("click", function() {
    phraseSpan.textContent = buildFinalPhrase();
  });
});
