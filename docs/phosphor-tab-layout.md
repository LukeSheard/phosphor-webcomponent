# Phosphor Tab Layout

### Attributes / Events / Properties

### Attributes

- `data-tabs-movable` *[observed]* Sets if the tabs can be reordered

### Events
- `tab-change` Fired whenever the current tab is changed. 
```typescript
{
  title: string;
  widget: HTMLPhosphorWidgetElement; 
}
```

## Usage

```html
  <phosphor-tab-layout>
    <phosphor-widget data-title="Tab 1">
      <!-- Your Content Goes here -->
    </phosphor-widget>
    <phosphor-widget data-title="Tab 2" data-closable="true">
      <!-- Your Content Goes here -->
    </phosphor-widget>
  </phosphor-tab-layout>
```