# Phosphor Doc Layout

## Attributes / Events / Properties

### Attributes

- `data-spacing` *[observed]* Sets the spacing between the widgets in the layout.

### Events
- `layout-change`

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