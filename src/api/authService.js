// Mock authentication service
// Replace this with actual API calls in production

export const login = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "anassreda88@gmail.com" && password === "12345678") {
                const token = "mock-jwt-token-1234567890";
                const user = { email, name: "Test User" };
                resolve({ token, user });
            } else {
                reject(new Error("Invalid email or password"));
            }
        }, 1000);
    });
};

export const register = async (email, password, name) => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
             const token = "mock-jwt-token-1234567890";
             const user = { email, name };
             resolve({ token, user });
        }, 1000);
    });
};

export const logout = async () => {
    // Perform server-side logout if necessary
    return Promise.resolve();
};
