/// <amd-module name="decorators"/>
/// <reference path="../bower_components/reflect-metadata/Reflect.d.ts" />

/**
 * A TypeScript class decorator that defines a custom element with name
 * `tagname` and the decorated class.
 */
export function customElement(tagname: string) {
  return (clazz: any) => {
    clazz.is = tagname;
    window[clazz.name] = clazz; // Register class in windows se that is can be use without IMD module loading.
                                // Useful for import in pure JS project.
    window.customElements.define(tagname, clazz);
  }
}

export interface PropertyOptions {
  notify?: boolean;
};

/**
 * A TypeScript property decorator factory that defines this as a Polymer
 * property.
 *
 * This function must be invoked to return a decorator.
 */
export function property<T>(options?: PropertyOptions) {
  return (proto: any, propName: string) : any => {
    const notify = (options && options.notify) as boolean
    const type = Reflect.getMetadata("design:type", proto, propName);
    const config = _ensureConfig(proto);
    config.properties[propName] = {
      type,
      notify,
    };
  }
}


export function domElement<T>() {
  return (proto: any, propName: string) : any => {
  }
}

/**
 * A TypeScript property decorator factory that causes the decorated method to
 * be called when a property changes. `targets` is either a single property
 * name, or a list of property names.
 *
 * This function must be invoked to return a decorator.
 */
export function observe(targets: string|string[]) {
  return (proto: any, propName: string) : any => {
    const targetString = typeof targets === 'string' ? targets : targets.join(',');
    const config = _ensureConfig(proto);
    config.observers.push(`${propName}(${targetString})`);
  }
}

interface Config {
  properties: {[name: string]: PropertyDefinition};
  observers: string[];
}

interface PropertyDefinition {
  notify?: boolean;
  type: Function;
}

function _ensureConfig(proto: any): Config {
  const ctor = proto.constructor;
  if (ctor.hasOwnProperty('__polymer_ts_config')) {
    return ctor.__polymer_ts_config;
  }

  Object.defineProperty(ctor, 'config', {
    get() { return ctor.__polymer_ts_config; }
  });

  const config: Config = ctor.__polymer_ts_config = ctor.__polymer_ts_config || {};
  config.properties = config.properties || {};
  config.observers = config.observers || [];
  return config;
}
