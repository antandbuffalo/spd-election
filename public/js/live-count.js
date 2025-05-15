/**
 * Live Count Tracker
 *
 * This script tracks live visitor count by communicating with a server.
 * It can be used both as a module (import/require) or directly in a script tag.
 */

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.getLiveCount = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  /**
   * Gets the live visitor count from the server and sets up continuous polling
   * @param {Function} onUpdate - Callback function that receives the live count
   * @param {number} interval - Update interval in milliseconds (default: 1 minute)
   * @returns {Function} Function to stop the polling
   */
  function getLiveCount(onUpdate, interval = 60000) {
    const deviceId =
      localStorage.getItem("deviceId") ||
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : null) ||
      Math.random().toString(36).substring(2, 15);

    localStorage.setItem("deviceId", deviceId);

    // Try to get domain from window.location or default to localhost
    const domain =
      window && window.location && window.location.hostname
        ? window.location.hostname
        : "localhost";

    const server = "https://spd-election.onrender.com/count";

    // Tracking variable to control polling
    let isPolling = true;
    let isFirstCall = true;

    // Function to handle the polling with delay
    async function poll() {
      if (!isPolling) return;

      try {
        const url = new URL(server);

        const payload = {
          deviceId: deviceId,
          domain: domain,
        };

        // Add extra parameter for first call
        if (isFirstCall) {
          payload.isFirstTime = true;
          isFirstCall = false;
        }

        const response = await fetch(url.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          onUpdate(0);
        } else {
          const data = await response.json();
          onUpdate(data.liveCount);
        }
      } catch (error) {
        onUpdate(0);
        console.error("Error fetching live count:", error);
      }

      // Schedule next call only after the current one finishes
      if (isPolling) {
        setTimeout(poll, interval);
      }
    }

    // Start the initial polling
    poll();

    // Return function to stop polling
    return function stopPolling() {
      isPolling = false;
    };
  }

  return getLiveCount;
});
