# Phosphor Doc Layout

## Attributes / Events / Properties & Methods

### Attributes

- `data-spacing` *[observed]* Sets the spacing between the widgets in the layout.

### Events
- `layout-change` dispatched whenever the dock layout is modified. 

### Properties & Methods

- `saveLayout()` - save the internal repsentation of the layout currently on screen. N.B. This is **NOT** json serializable.
- `restoreLayout(layout)` - takes a phosphor layout and presents it to be currently visable 

## Usage

```html
  <phosphor-dock-layout>
    <phosphor-widget data-title="Tab 1">
      <!-- Your Content Goes here -->
    </phosphor-widget>
    <phosphor-widget data-title="Tab 2" data-closable="true">
      <!-- Your Content Goes here -->
    </phosphor-widget>
  </phosphor-dock-layout>
```