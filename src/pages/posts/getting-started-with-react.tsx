interface PostProps {
  title: string;
  date: string;
  content: React.ReactNode;
}

function GettingStartedWithReact(): PostProps {
  return {
    title: 'Getting Started with React',
    date: '2024-01-15',
    content: (
      <div>
        <p>React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the fundamentals of React development.</p>
        
        <h2>What is React?</h2>
        <p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".</p>
        
        <h2>Getting Started</h2>
        <p>To get started with React, you'll need to have Node.js installed on your machine. Then you can create a new React application using Create React App:</p>
        
        <pre><code>npx create-react-app my-app{`
`}cd my-app{`
`}npm start</code></pre>
        
        <p>This will create a new React application and start the development server.</p>
        
        <h2>Your First Component</h2>
        <p>Components are the building blocks of React applications. Here's a simple example:</p>
        
        <pre><code>{`function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}`}</code></pre>
        
        <p>This component accepts a single "props" object argument with data and returns a React element.</p>
      </div>
    )
  };
}

export default GettingStartedWithReact;