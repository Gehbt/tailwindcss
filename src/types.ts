export type TWConfig = import('tailwindcss').Config;
export type ResolvedTwConfig = ReturnType<typeof import('tailwindcss/resolveConfig')>
export type Arrayable<T> = T | Array<T>;
export type InjectPosition = 'first' | 'last' | number | { after: string };

interface ExtendTailwindConfig {
  content?:
    | TWConfig['content']
    | ((contentDefaults: Array<string>) => TWConfig['content']);
}

type BoolObj<T extends Record<string, any>> = boolean | Partial<T>;

export type ViewerConfig = {
  /**
   * The endpoint for the viewer
   *
   * @default '/_tailwind'
   */
  endpoint: `/${string}`
  /**
   * Export the viewer during build
   *
   * Works in Nuxt 3; for Nuxt 2, use `npx tailwind-config-viewer export`
   *
   * @default false
   */
  exportViewer: boolean;
};

export type ExposeConfig = {
  /**
   * Import name for the configuration
   *
   * @default '#tailwind-config'
   */
  alias: string;
  /**
   * Deeper references within configuration for optimal tree-shaking.
   *
   * @default 2
   */
  level: number
};

export interface ModuleOptions {
  /**
   * The path of the Tailwind configuration file. The extension can be omitted, in which case it will try to find a `.js`, `.cjs`, `.mjs`, or `.ts` file.
   *
   * @default 'tailwind.config'
   */
  configPath: Arrayable<string>;
  /**
   * The path of the Tailwind CSS file. If the file does not exist, the module's default CSS file will be imported instead.
   *
   * @default '~/assets/css/tailwind.css'
   */
  cssPath: string | false;
  /**
   * Configuration for Tailwind CSS
   *
   * for default, see https://tailwindcss.nuxtjs.org/tailwind/config
   */
  config: Omit<TWConfig, keyof ExtendTailwindConfig> & ExtendTailwindConfig;
  /**
   * [tailwind-config-viewer](https://github.com/rogden/tailwind-config-viewer) usage *in development*
   *
   * @default true // { endpoint: '_tailwind' }
   */
  viewer: BoolObj<ViewerConfig>;
  /**
   * Usage of configuration references in runtime. See https://tailwindcss.nuxtjs.org/tailwind/config#referencing-in-the-application
   *
   * @default false // if true, { alias: '#tailwind-config', level: 2 }
   */
  exposeConfig: BoolObj<ExposeConfig>;
  /**
   * Deeper references within configuration for optimal tree-shaking.
   *
   * @default 2
   * @deprecated use exposeConfig as object
   */
  exposeLevel: number;
  /**
   * The position of CSS injection affecting CSS priority
   *
   * @default 'first'
   */
  injectPosition: InjectPosition;
  /**
   * @default false
   */
  disableHmrHotfix: boolean;
  /**
   * Suppress logging to the console when everything is ok
   *
   * @default nuxt.options.logLevel === 'silent'
   */
  quiet: boolean;
  /**
   * Add util to write Tailwind CSS classes inside strings with `` tw`{classes}` ``
   *
   * @default false
   */
  addTwUtil: boolean;
}

export interface ModuleHooks {
  /**
   * Passes any Tailwind configuration read by the module for each (extended) [layer](https://nuxt.com/docs/getting-started/layers) and [path](https://tailwindcss.nuxtjs.org/getting-started/options#configpath) before merging all of them.
   * 
   * @param tailwindConfig 
   * @returns 
   */
  'tailwindcss:config': (tailwindConfig: Partial<TWConfig>) => void;
  /**
   * Passes the resolved vanilla configuration read from all layers and paths with merging using [defu](https://github.com/unjs/defu).
   * 
   * @param tailwindConfig 
   * @param configPath 
   * @param index 
   * @param configPaths 
   * @returns 
   */
  'tailwindcss:loadConfig': (tailwindConfig: Partial<TWConfig> | undefined, configPath: string, index: number, configPaths: string[]) => void;
  /**
   * Passes the complete resolved configuration with all defaults from [the full Tailwind config](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js) using resolveConfig.
   * 
   * @param tailwindConfig
   * @returns 
   */
  'tailwindcss:resolvedConfig': (tailwindConfig: ResolvedTwConfig) => void;
}
