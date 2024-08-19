type fetchProps = (pathurl: string, data: Object) => Promise<any>;

export const PostApi: fetchProps = async (pathurl, data) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${pathurl}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in PostApi:", error);
    throw error;
  }
};

export const PatchApi: fetchProps = async (pathurl, data) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${pathurl}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in PostApi:", error);
    throw error;
  }
};

export const DeleteApi = async (pathurl: string, data: string[]) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${pathurl}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in DeleteApi:", error);
    throw error;
  }
};

export const GetApi = async (pathurl: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${pathurl}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in PostApi:", error);
    throw error;
  }
};
