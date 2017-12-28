# Phosphor Layout Shared

This package is the core package that underpins the [Phosphor-Dock-Layout](./phosphor-dock-layout.md) and [Phosphor-Tab-Layout](./phosphor-tab-layout.md)  
## Phosphor Widget

### Attributes

- `data-title` **[Required]** *[observed]* Represents the title the given to the widget in the Layout. When the attribute changes, it will update the widget title in the layout.
- `data-closable` *[observed]* Represents if the widget is closable.
- `data-mode` When mounted in a [Dock Layout](./phosphor-dock-layout.md) this represents the split method used by the dock-layout.

Note if any of the required attributes are not found on the widget component it will remove itself from the DOM when it is mounted.

### Properties / Methods

- `widget` - The underlying phosphor 
- `remove` - Remove this widget from the layout it is attached to, otherwise remove the DOM node from the document.
- `resize` - Resize this widget and the underlying widgets

### Events
- `remove`
- `resize`
- `widget-hide`
- `widget-show`

### Usage

```html
<phosphor-widget data-title="Widget">
  <!-- Your Content Goes here -->
</phosphor-widget>
```