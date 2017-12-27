# Phosphor Layout Shared

This package is the core package that underpins the [Phosphor-Dock-Layout](./phosphor-dock-layout.md) and [Phosphor-Tab-Layout](./phosphor-tab-layout.md)  
## Phosphor Widget

### Attributes

- `data-title`
- `data-closable`

### Properties / Methods

- `widget` - The underlying phosphor 
- `remove` - Remove this widget from the layout it is attached to, otherwise remove the DOM node from the document.
- `resize` - Resize this widget and the underlying widgets

### Events
- `remove`
- `resize`
- `widget-hide`
- `widget-show`