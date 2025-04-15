/**
 * Live Count Tracker
 *
 * This script tracks live visitor count by communicating with a server.
 * It can be used both as a module (import/require) or directly in a script tag.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.getLiveCount = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {

  /**
   * Gets the live visitor count from the server
   * @param {Function} onUpdate - Callback function that receives the live count
   * @returns {Promise<void>}
   */
  async function getLiveCount(onUpdate) {
    const deviceId =
      localStorage.getItem("deviceId") ||
      (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : null) ||
      Math.random().toString(36).substring(2, 15);

    localStorage.setItem("deviceId", deviceId);

    // Try to get domain from window.location or default to localhost
    const domain = (typeof window !== 'undefined' && window.location)
      ? window.location.hostname
      : "localhost";

    const server = "https://spd-election.onrender.com/count";

    try {
      const url = new URL(server);
      url.searchParams.append("deviceId", deviceId);
      url.searchParams.append("domain", domain);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        onUpdate(0);
        return;
      }

      const data = await response.json();
      onUpdate(data.liveCount);
    } catch (error) {
      onUpdate(0);
      console.error("Error fetching live count:", error);
    }
  }

  return getLiveCount;
}));