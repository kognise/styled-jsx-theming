<center align='center'>

# Styled-JSX Theming Library

*An opinionated theming library for your Styled-JSX projects to develop stylesheets faster.*

This can be easily used for other React styling libraries as well, but it was designed for Styled-JSX which I primarily use.

</center>

## Getting Started

First, install the package:

```bash
npm i styled-jsx-theming
```

Alternatively, if you use Yarn:

```bash
yarn add styled-jsx-theming
```

Next, wrap your React app with `ThemingProvider`:

<details>

<summary>Next.js example</summary>

`pages/_app.js`

```jsx
import App from 'next/app'
import ThemingProvider from 'styled-jsx-theming'

export default class extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemingProvider theme={{
        background: '#000000',
        color: '#ffffff'
      }}>
        <Component {...pageProps} />
      </ThemingProvider/>
    )
  }
}
```

</details>

<details>

<summary>Gatsby example</summary>

`gatsby-browser.js`

```jsx
import React from 'react'
import ThemingProvider from 'styled-jsx-theming'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemingProvider theme={{
      background: '#000000',
      color: '#ffffff'
    }}>
      {element}
    </ThemingProvider>
  );
}
```

</details>

<details>

<summary>Generic example</summary>

```jsx
import React, { Component } from 'react'
import ThemingProvider from 'styled-jsx-theming'
// Import `App` or something

export default class extends Component {
  render() {
    return (
      <ThemingProvider theme={{
        background: '#000000',
        color: '#ffffff'
      }}>
        <App />
      </ThemingProvider/>
    )
  }
}
```

</details>

## Using the Theme

Of course, the next step is actually using the theme in a component. There are two methods to this.

### `useTheme` React Hook

```jsx
import { useTheme } from 'styled-jsx-theming'

export default (props) => {
  const [ theme ] = useTheme()

  <div>
    {props.children}

    <style jsx>{`
      div {
        background: ${theme.background};
        color: ${theme.color};
      }
    `}</style>
  </div>
}
```

### `withTheme` HOC

```jsx
import { Component } from 'react'
import { withTheme } from 'styled-jsx-theming'

export withTheme(class extends Component {
  render() {
    <div>
      {this.props.children}

      <style jsx>{`
        div {
          background: ${this.props.theme.background};
          color: ${this.props.theme.color};
        }
      `}</style>
    </div>
  }
})
```

## Multiple Themes

So far all the examples have involved just one theme that can be accessed, but sometimes you'll want to be able to switch between multiple.

First, modify the theming provider:

```jsx
<ThemingProvider
  themes={{
    dark: {
      background: '#000000',
      color: '#ffffff'
    },
    light: {
      background: '#ffffff',
      color: '#000000'
    }
  }}
  default='dark'
>
  <App />
</ThemingProvider>
```

As you can see, we replaced the `theme` property with `themes`, that specifies multiple themes and their names, as well as `default` that chooses the defaultly selected theme.

To set the theme with the `useTheme` hook:

```js
const [ theme, setTheme ] = useTheme()

setTheme('light')
```

Or if you're using the HOC:

```js
this.props.setTheme('light')
```

## Development

Styled-JSX Theming Library is open to contributions! I'll review pull requests anyone makes, so feel free to submit one.

Run `yarn` to install all dependencies.

I've written this library with TypeScript, so run `yarn dev` to automatically run a build when you change a file.
