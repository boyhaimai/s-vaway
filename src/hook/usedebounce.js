const { useEffect, useState } = require("react");

function useDebounce(value, delay) {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay);

    return () => clearTimeout(handler);
  });

  return debounce;
}

export default useDebounce;
