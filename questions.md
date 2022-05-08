1. What is the difference between Component and PureComponent? give an example where it might break my app.

   > Pure component is used to improve performance of the app by performing shallow comparison on the props.
   > Internally, it uses `shouldComponentUpdate` lifecycle to perform the said task.
   > Components on the other hand will not perform a shallow comparison, and you have to do it youself in the `shouldComponentUpdate` lifecycle.
   > In functional components, these can be distinguished with `memo(Component)` HOC. The memo HOC represents PureComponent.
   > There are caveats though, as it is not the best idea to transform everything into PureComponent / memo HOC, as sometimes performing shallow comparison
   > will reduce performance instead of improve it. For example, using PureComponent / memo on a component with lots of props, especially objects, you might break the app either by not registering the proper change, since PureComponent will do a shallow comparison. And sometimes shallow comparison can effectifely be costlier than not comparing at all.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

   > Using context and `shouldComponentUpdate` can lead to unexpected results, as `shouldComponentUpdate` method can be overruled by context's children (since they are a priority re-render on context value change).

3. Describe 3 ways to pass information from a component to its PARENT.

   > 1. Create a method in parent component which accepts an argument that will be used in the parent component, pass the given method to a child component, invoke the method inside a child component and pass the appropriate value inside. For example in my Autocomplete's `<Results />` I pass `onClick` to `<Result />` which is invoked inside the child (Result) and passed the ID inside the method which is then read by the parent (Results)
   > 2. Create a global store which is equally accessible by both parent and the child. Dispatch the change in the child component with the respective value, register change in the Parent component and receive the change effectively made by the Child component. (Redux, Context, Mobx...)
   > 3. Child and parent could have a different form of direct communication from Global state, such as WebRTC or WebSockets.

4. Give 2 ways to prevent components from re-rendering.

   > 1. In functional components, using `memo(...)` HOC and proper hooks like `useCallback`, `useMemo`, `useState` with proper use of their dependency array, occasionally using `useRef` as a comparison value only, never read refs in render, but good to store old value and decide on re-render.
   > 2. In class components make use of `PureComponent` which will handle its own shallow comparison using `shouldComponentUpdate`, or write your own `shouldComponentUpdate` for more specific comparison

5. What is a fragment and why do we need it? Give an example where it might break my app.

   > Fragment is a specific type of React syntax which allows us to render components which do not have a parent component (react will throw an error on attempting to do) `items.map(() => (<item1 /><item /2>)`, so fragment can be used as such `items.map(() => <Fragment><item1 /><item2 /></Fragment>)` We can also use the shorthand `<></>` instead of `Fragment / React.Fragment`. We can most heavily feel its use in rendering tables, and being able to add children wihthout the need to wrap the im `<div />` or similar, which breaks tha look. If misunderstood for an element that is rendered in the DOM, Fragment might break your app design & structure-wise by not acting like a wrapper. Invoking Fragment can break the app if not used in a proper React version where it is avilable.

6. Give 3 examples of the HOC pattern.

   > HOC's or High Order Components are used to reuse specific logic from the component. In functional components we can achieve a similar result using custom hooks with reuseable logic. Most common HOC patterns we use while developing with React is Redux's `connect(...)` which injects the component with props from a passed selector and other redux methods, React-Router's `withRouter(...)`, which injects the app with props used to navigate and check url, `memo(...)` which is a functional component's way of creating automatic shallow comparison on the props

7. What's the difference in handling exceptions in promises, callbacks and async...await.

   > Async and await are syntatic sugar which represent promises in a cleaner, more readable and synchronous looking way. They also avoid callback hell creation with promises we will rely on chained callbacks such as `.then` `.catch` `.finally`, whilst in async/await we will use `try catch finally` in form of "blocks", and we will rely on `await x = somethingAsync()` to get the data. Async functions must also begin with `async` in the expression, like `const methods = async () => { try { ... } catch (e) { ... } finally { ... } }`.

8. How many arguments does setState take and why is it async.

   > `this.setState` accepts a new value, and a callback method, used like `this.setState({ value: 'value' }, (newValue) => { ... })`. The callback method is used when wanting to react on a given `setState` change, since `this.setState` is asynchronous for performance reasons.
   > Meaning that this won't work:

   ```
   this.setState({ value: 'newChange' });
   console.log(this.state.value) // Not guaranteed to be 'newChange'
   ```

   But this will:

   ```
   this.setState({ value: 'newChange' }, (newState) => console.log(newState));
   ```

9. List the steps needed to migrate a Class to Function Component.

   > 1. Replace class syntax sugar with functional components eg. `class App extends React.Component` to `const App = () => {...}`
   > 2. Remove the render method eg.

   ```
   class App extends React.Component {
     render() {
       return (
         <Hello />
       )
     }
   }

   // to

   const App = () => {
     return (
       <Hello />
     )
   }
   ```

   > 3. Replace constructor with `useState`, `useRef` hooks, replace calling `this.setState` with `setState` from `useState` hook.

   ```
   class App extends React.Component {
     constructor(props) {
       super(props);

       this.state = {
         hello: 1,
       },
     }
   }

   // to

   const App = () => {
     const [hello, setHello] = useState(1);
   }
   ```

   > 4. Replace methods with useCallbacks

   ```
   class App extends React.Component {
     constructor() {
       super();

       this.myMethod = this.myMethod.bind(this);
     }

     myMethod() {
       // something
     }
   }

   // to

   const App = () => {
     const myMethod = useCallback(() => { // something }, []);
   }
   ```

   > 4. Replace lifecycle methods with useEffect

   ```
   class App extends React.Component {
     ...
     componentDidMount() { ... }
     componentDidUpdate() { ... }
   }

   // to

   const App = () => {
     useEffect(() => {
       ...
     }, [])
   }
   ```

   > 5. If used PureComponent, convert to `memo(...)` HOC

10. List a few ways styles can be used with components.

    1. Using inline styling as such `<h1 style={{ color: 'red', fontSize: 20 }}>...</h1>`

    2. Using css file

    ```
    // index.css
    .color-red {
      color: red;
    }

    // index.js
    import './index.css';

    ...

    <h1 className="color-red">...</h1>
    ```

    3. Using CSS-in-JS

    ```
    const StyledH1 = styled('h1')`
        color: red;
    `

    ...

    <StyledH1>...</StyledH1>
    ```

11. How to render an HTML string coming from the server.
    > We can render HTML string using `dangerouslySetInnerHTML={{ __html: value }}` property. Keep in mind that this exposes your app to XSS injection and other vulnerabilities
    > if the value is not sanitized.
