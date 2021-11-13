import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import EnhancedTable from "../components/Table";
import https from "https";

export default function Home() {
  const [foodList, setFoodList] = React.useState([]);

  React.useEffect(() => {
    apiRequest();
  }, []);
  const apiRequest = async () => {
    const api_key = "?api_key=InURJ29ywpKYuBQbs09yhWzaxb3Y5B6TZBmHtcJQ";
    const url = "https://api.nal.usda.gov/fdc/v1";
    const foodList = "/foods/list";
    const pageSize = "&pageSize=200";
    // const nutrients =
    //   "&nutrients=203&nutrients=205&nutrients=204&nutrients=208&nutrients=269";
    const request = url + "/foods/list" + api_key + pageSize;
    let foodListObject = null;
    https.get(request, async (response) => {
      console.debug("RESPONSE: ", response);
      response.on("error", (e) => {
        console.error("Request error: ", e);
      });

      response.setEncoding("utf8");
      let body = "";
      response.on("data", (chunk) => {
        body = body + chunk;
      });

      response.on("end", () => {
        foodListObject = JSON.parse(body);
        setFoodList(foodListObject);
      });
    });
  };
  return (
    <Box>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Daxco Foods
      </Typography>
      {foodList && foodList.length > 0 ? (
        <EnhancedTable rows={foodList} />
      ) : (
        console.debug("nodice")
      )}
    </Box>
  );
}
