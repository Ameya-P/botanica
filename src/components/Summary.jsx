import { useState, useEffect } from 'react'

const Summary = ({plants, filteredResults}) => {
  const [edibleCount, setEdibleCount] = useState(0);
  const [mostCommon, setMostCommon] = useState({
    Life_cycle: "",
    Water_requirement: "",
    Light_requirement: "",
    Soil_type: ""
  });

  useEffect(() => {
    const incrementVal = (attri_count, array_item, category) => {
      if (array_item.data[category]) {
        const str = array_item.data[category];
        const values = str.split(',').map(item => item.trim());
        for (const value of values) {
          attri_count[category][value] = (attri_count[category][value] || 0) + 1;
        }
      } else {
        attri_count[category]["Unknown"] += 1;
      }
    }

    const findMostCommon = (array) => {
      // Create a count of every option for each category
      const attri_count = {
        Edible: 0,
        Life_cycle: {
          Annual: 0, 
          Perennial: 0, 
          Biennial: 0, 
          Unknown: 0
        },
        Water_requirement: {
          Moist: 0, 
          Dry: 0, 
          Wet: 0, 
          Unknown: 0
        },
        Light_requirement: {
          "Full sun": 0,
          "Partial sun/shade": 0,
          "Full shade": 0, 
          Unknown: 0
        },
        Soil_type: {
          "Light (sandy)": 0,
          Medium: 0,
          "Heavy (clay)": 0,
          Unknown: 0,
        }
      }

      for (const plant of array) {
        if (plant.data["Edible"] === "true" || plant.data["Edible"] === "True") {
          attri_count.Edible += 1;
        }

        incrementVal(attri_count, plant, "Life_cycle");
        incrementVal(attri_count, plant, "Water_requirement");
        incrementVal(attri_count, plant, "Light_requirement");
        incrementVal(attri_count, plant, "Soil_type");
      }

      console.log(attri_count);
      
      // Find all of the most common values 
      setEdibleCount(attri_count.Edible);
      
      for (const [category, values] of Object.entries(attri_count)) {
        if (category === "Edible") {
          continue;
        }

        let most_name = "";
        let most_freq = 0;
        
        for (const [value_type, value_freq] of Object.entries(values)) {
          if (value_freq > most_freq) {
            most_freq = value_freq;
            most_name = value_type;
          }
        }

        setMostCommon(prev => ({
          ...prev, 
          [category]: most_name
        }));
      }
    }

    // Call the function with the appropriate data
    const dataToAnalyze = filteredResults || plants;
    if (dataToAnalyze && dataToAnalyze.length > 0) {
      findMostCommon(dataToAnalyze);
    }
  }, [plants, filteredResults]);

  return (
    <div className="summary">
      <h3>Summary Statistics</h3>
      <div className="stats">
        <div className="total">
          <strong>Total (All Plants):</strong> {filteredResults ? filteredResults.length : plants.length}
        </div>
        <div className="num-edible">
          <strong>Total (Edible Plants):</strong> {edibleCount}
        </div>
        <div className="common-lifecycle">
          {mostCommon.Life_cycle}
        </div>
        <div className="common-water">
          {mostCommon.Water_requirement}
        </div>
        <div className="common-light">
          {mostCommon.Light_requirement}
        </div>
        <div className="common-soil">
          {mostCommon.Soil_type}
        </div>
      </div>
    </div>
  )
}

export default Summary