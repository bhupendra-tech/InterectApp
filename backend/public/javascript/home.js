setTimeout(() => {
  isUserLoggedIn();
}, 1000);

const isUserLoggedIn = async () => {
  const response = await fetch("/api/v1/user/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.status === 200) {
    location.href = response.url;
  }
};
