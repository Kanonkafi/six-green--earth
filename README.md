#### 1) What is the difference between var, let, and const?
 ans 
 ### ---var------

শুধু function এর ভেতরে কাজ করে, বাইরে গেলে আর থাকে না।
বারবার declare করা যায়, আবার value change করাও যায়।
উপরে উঠে যায় (hoisting হয়), তবে শুরুতে value থাকে undefined।

### ----------let-------

শুধু { ... } ব্লকের ভেতরে কাজ করে।
value change করা যায়, কিন্তু একই scope-এ আবার declare করা যায় না।
hoist হয়, কিন্তু আগে থেকে ব্যবহার করলে error দেয়।

### ------const---------

এটাও block scoped.

declare করার পর আর value change করা যায় না (number, string হলে)।

কিন্তু object/array হলে ভিতরের data modify করা যায়।

1.  
### Scope (কোথায় কাজ করে)
var → Function scoped
if (true) {
  var x = 10;
}
console.log(x); // ✅ 10 (বাইরেও কাজ করছে, কারণ var function scoped)

another function test() {
  var a = 10;
  console.log(a); // ✅ 10 (function এর ভেতরে কাজ করছে)
}
test();
console.log(a); // ❌ Error (function এর বাইরে কাজ করছে না)

let → Block scoped
if (true) {
  let y = 20;
}
console.log(y); // ❌ Error (block এর বাইরে কাজ করছে না)

const → Block scoped
if (true) {
  const z = 30;
}
console.log(z); // ❌ Error (block এর বাইরে কাজ করছে না)

2. Redeclare (আবার declare করা যাবে?)
var → হ্যাঁ
var a = 5;
var a = 10; // ✅ allowed
console.log(a); // 10

let → না
let b = 5;
// let b = 10; // ❌ Error (same scope এ আবার declare করা যাবে না)
b = 10;       // ✅ শুধু value change করা যাবে
console.log(b); // 10

const → না
const c = 5;
// const c = 10; // ❌ Error
// c = 10;       // ❌ Error (value change-ই করা যাবে না)
console.log(c); // 5

3. Hoisting (আগেই মেমরিতে উঠে যায়?)
var → hoist হয়, value = undefined
console.log(d); // undefined
var d = 50;

let & const → hoist হয়, কিন্তু initialize হয় না (TDZ)
console.log(e); // ❌ ReferenceError
let e = 100;

4. Objects & Arrays (const দিয়ে change করা যায়?)
const object
const user = { name: "Rahim", age: 20 };

// user = { name: "Karim" }; ❌ পুরো object change করা যাবে না

user.age = 25; // ✅ object এর ভেতরের value change করা যাবে
console.log(user); // { name: "Rahim", age: 25 }

const array
const nums = [1, 2, 3];

nums.push(4); // ✅ array তে নতুন item add করা যাবে
console.log(nums); // [1, 2, 3, 4]

#### 2) What is the difference between map(), forEach(), and filter()? 

 1. forEach()

Loops through each item in the array.
Executes a callback function.
Does not return a new array, only undefined.
Used for performing side effects (e.g., logging, updating UI).

const numbers = [1, 2, 3];
numbers.forEach(num => console.log(num * 2)); 
// Output: 2, 4, 6
// But returns: undefined

2. map()

Loops through each item in the array.
Executes a callback function.
Returns a new array with transformed values.
Used when you want to create a modified array.

const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]

3. filter()

Loops through each item in the array.
Executes a callback function that returns true/false.
Returns a new array with only the items that passed the condition.

const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter(num => num % 2 === 0);
console.log(even); // [2, 4]

forEach()

Array টা ঘুরে ঘুরে প্রতিটা element এর জন্য function চালায়।
কোনো নতুন array return করে না, শুধু কাজ করে (side effect)।
যেমন console.log, DOM update ইত্যাদি।

2. map()

প্রতিটা element এর উপর function চালায়।
কিন্তু নতুন একটা array বানিয়ে return করে (যেখানে value পরিবর্তিত হতে পারে)।

3. filter()

প্রতিটা element এর উপর শর্ত (condition) চেক করে।
যেগুলো true হয়, শুধু সেগুলো নিয়েই নতুন array বানায়।

#### 3) What are arrow functions in ES6?
   Arrow Function কী?

Function লেখার একটা ছোট ও সহজ উপায়।
function keyword না লিখে, শুধু => ব্যবহার করা হয়।
নিজের আলাদা this তৈরি করে না, বাইরে থেকে নেয়।

🔹 উদাহরণ

Traditional function:

function multiply(a, b) {
  return a * b;
}


Arrow function:

const multiply = (a, b) => a * b;

🔹 বৈশিষ্ট্য

ছোট লেখা যায় → কম কোড।
return না লিখলেও চলে (যদি এক লাইনের expression হয়)।
const double = n => n * 2;
console.log(double(6)); // 12

this এর behavior আলাদা → arrow function এ this বাইরে থেকে নেয়

#### 4) How does destructuring assignment work in ES6?
Array Destructuring

Array থেকে আলাদা আলাদা মান বের করার শর্টকাট।

const numbers = [10, 20, 30];
const [a, b, c] = numbers;
console.log(a, b, c); // 10 20 30


 মানে [10, 20, 30] থেকে এক এক করে variable এ assign হয়ে গেল।

🔹 Object Destructuring

Object থেকে property বের করার শর্টকাট।

const user = { name: "Rahim", age: 25 };
const { name, age } = user;
console.log(name, age); // Rahim 25


 এখানে আর user.name বা user.age লিখতে হলো না।

🔹 সুবিধা

কোড ছোট হয়।
বারবার obj.property লিখতে হয় না।
Default value দেওয়া যায়।
Rename করা যায়।
Nested data থেকে সহজে value বের করা যায়।

#### 5) Explain template literals in ES6. How are they different from string concatenation?
Template Literals কী?

Template literals হলো ES6 এর নতুন string syntax, যেখানে backticks ` ব্যবহার করা হয়, সাধারণ single ' ' বা double " " এর পরিবর্তে।

এটার সুবিধা:

Variable বা expression সরাসরি string এর মধ্যে embed করা যায়।
Multiline strings খুব সহজে লেখা যায়।

Syntax
const name = "Alice";
const age = 25;

// Template literal ব্যবহার করে
const message = `আমার নাম ${name} এবং আমি ${age} বছর বয়সী।`;

console.log(message); 
// Output: আমার নাম Alice এবং আমি 25 বছর বয়সী।


বিস্তারিত:

${...} হচ্ছে expression interpolation

${...} এর মধ্যে variable, math expression, function call সব দেওয়া যায়।

Multiline strings
const multiline = `এটা লাইন ১
এটা লাইন ২
এটা লাইন ৩`;

console.log(multiline);
/* Output:
এটা লাইন ১
এটা লাইন ২
এটা লাইন ৩
*/


কোনো \n ব্যবহার করার দরকার নেই।

String Concatenation এর সাথে পার্থক্য
পুরনোভাবে: Concatenation
const name = "Alice";
const age = 25;

const message = "আমার নাম " + name + " এবং আমি " + age + " বছর বয়সী।";
console.log(message);


+ operator দিয়ে string join করতে হয়।

যদি অনেক variable বা দীর্ঘ string থাকে → readability কমে।

Multiline string হলে \n ব্যবহার করতে হয়।
