interface PostProps {
  title: string;
  date: string;
  content: React.ReactNode;
}

function TypeScriptForBeginners(): PostProps {
  return {
    title: 'TypeScript for Beginners',
    date: '2024-01-05',
    content: (
      <div>
        <p>TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to JavaScript, which can help catch errors early and improve code quality.</p>
        
        <h2>Why TypeScript?</h2>
        <p>TypeScript offers several benefits over plain JavaScript:</p>
        <ul>
          <li>Static type checking catches errors at compile time</li>
          <li>Better IDE support with autocomplete and refactoring</li>
          <li>Improved code documentation through type annotations</li>
          <li>Easier maintenance of large codebases</li>
          <li>Enhanced developer productivity</li>
        </ul>
        
        <h2>Basic Types</h2>
        <p>TypeScript includes several basic types:</p>
        
        <pre><code>{`// Basic types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];

// Function with types
function greet(name: string): string {
  return "Hello, " + name;
}`}</code></pre>
        
        <h2>Interfaces</h2>
        <p>Interfaces define the shape of objects:</p>
        
        <pre><code>{`interface User {
  name: string;
  age: number;
  email?: string; // Optional property
}

function createUser(user: User): void {
  console.log(\`Creating user: \${user.name}\`);
}`}</code></pre>
        
        <h2>Getting Started</h2>
        <p>To start using TypeScript in your project:</p>
        
        <pre><code>{`# Install TypeScript globally
npm install -g typescript

# Create a TypeScript config file
tsc --init

# Compile TypeScript files
tsc filename.ts`}</code></pre>
        
        <p>Getting started with TypeScript is easy - you can gradually adopt it in existing JavaScript projects by simply renaming .js files to .ts and adding type annotations incrementally.</p>
      </div>
    )
  };
}

export default TypeScriptForBeginners;