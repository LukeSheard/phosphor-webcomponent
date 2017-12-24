# Phosphor Web Components

This is a collection of two [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) based on the [phosphor](http://www.github.com/phosphorjs/phosphor) library which provide a generic tab, and dock html component. 

## Usage

### Phosphor-Widget

```html
<phosphor-widget data-title="Widget">
  <!-- Your Content Goes here -->
</phosphor-widget>
```

This is the core component in both the tab and dock layouts, the `phosphor-widget` children of each of the layout components are converted into widgets within the layout.

#### Attributes and properties
- `data-title` **[Required]** *[observed]* Represents the title the given to the widget in the Layout. When the attribute changes, it will update the widget title in the layout.
- `data-closable`  *[observed]* Represents if the widget is closable.
- `data-mode` When mounted in a [Dock Layout](#Phosphor-Dock-Layout) this represents the split method used by the dock-layout.

### Phosphor-Tab-Layout

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

Create a TabPanel layout element from the children. 

### Phosphor-Dock-Layout

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

#### Attributes and properties
- `data-spacing` *[observed]* Sets the spacing between the widgets in the layout.