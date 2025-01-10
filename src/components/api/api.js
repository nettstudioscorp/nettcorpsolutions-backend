authAPI.resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      throw new Error("Falha ao redefinir senha");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
