This website is built with [Astro](https://astro.build/) with added [Preact](https://preactjs.com/) integration.
* [Preact 10 minute Tutorial](https://preactjs.com/tutorial/)
* [Astro Docs](https://docs.astro.build/en/getting-started/)
* [Preact Shared State Example](https://github.com/withastro/astro/tree/latest/examples/with-nanostores)
* **Sample Preact**
	```javascript
	import { h, Fragment } from 'preact';
	import { useState } from 'preact/hooks';
	import './Counter.css';

	export default function Counter({ children }) {
		const [count, setCount] = useState(0);
		const add = () => setCount((i) => i + 1);
		const subtract = () => setCount((i) => i - 1);

		return (
			<>
				<div class="counter">
					<button onClick={subtract}>-</button>
					<pre>{count}</pre>
					<button onClick={add}>+</button>
				</div>
				<div class="counter-message">{children}</div>
			</>
		);
	}
	```
