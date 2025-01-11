document.getElementById("clearbtn").addEventListener("click", function () {
  const searchText = document.getElementById("searchText");
  const resultDiv = document.getElementById("searchResult");
  searchText.value = "";
  resultDiv.innerHTML = "";
});
document.getElementById("searchbtn").addEventListener("click", function () {
  fetch("./travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const searchText = document.getElementById("searchText").value;

      const resultDiv = document.getElementById("searchResult");
      if (
        searchText.toLowerCase() === "beach" ||
        searchText.toLowerCase() === "beaches"
      ) {
        resultDiv.style.display = "block";
        const results = data["beaches"];
        resultDiv.innerHTML = "";
        results.forEach((x) => {
          const resultItem = document.createElement("div");
          resultItem.classList.add("searchresultdiv");
          resultItem.innerHTML += `<img src="${x.imageUrl}" alt="${x.name}" />
  <div class="description">
    <p><b>${x.name}</b></p>
    <p>${x.description}</p>
    <div><button>Visit</button></div>
  </div>`;

          resultDiv.appendChild(resultItem);
        });
      } else if (
        searchText.toLowerCase() === "temples" ||
        searchText.toLowerCase() === "temple"
      ) {
        resultDiv.style.display = "block";
        const results = data["temples"];
        resultDiv.innerHTML = ""; // Clear previous results

        results.forEach((x) => {
          // Create a div for each result
          const resultItem = document.createElement("div");
          resultItem.classList.add("searchresultdiv");
          resultItem.innerHTML += `<img src="${x.imageUrl}" alt="${x.name}" />
  <div class="description">
    <p><b>${x.name}</b></p>
    <p>${x.description}</p>
    <div><button>Visit</button></div>
  </div>`;
          //resultItem.innerHTML = x.name; // Set the text content
          // Optional: Add a CSS class

          // Append the result to the results container
          resultDiv.appendChild(resultItem);
        });
      } else if (
        searchText.toLowerCase() === "countries" ||
        searchText.toLowerCase() === "country"
      ) {
        resultDiv.style.display = "block";
        const results = data["countries"];
        resultDiv.innerHTML = "";

        results.forEach((x) => {
          const resultItem = document.createElement("div");
          resultItem.classList.add("searchresultdiv");
          resultItem.innerHTML += `
          <div class="description">
            <p><b>${x.name}</b></p>
            
          </div>`;

          x["cities"].map((y) => {
            resultItem.innerHTML += `<div><img src="${y.imageUrl}" alt="${y.name}" />
  <div class="description">
    <p><b>${y.name}</b></p>
    <p>${y.description}</p>
    <div><button>Visit</button></div>
  </div></div>`;
          });

          resultDiv.appendChild(resultItem);
        });
      } else {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "";
        resultDiv.innerHTML =
          "<div class='searchresultdiv'><div class='description'>No Results Found</div></div>";
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
