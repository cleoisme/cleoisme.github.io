    // Word data for the word cloud
    const words = [
      { text: "React", size: 40 },
      { text: "Hugo", size: 30 },
      { text: "D3.js", size: 20 },
      { text: "Node", size: 15 },
      { text: "Express", size: 15 },
      { text: "JavaScript", size: 45 },
      { text: "Web Development", size: 30 },
      { text: "TypeScript", size: 25 },
      { text: "Jest", size: 25 },
      { text: "GraphQL", size: 25 },
      { text: "Python", size: 10 },
      { text: "MongoDB", size: 15 },
      { text: "SQL", size: 30 },
      { text: "wordpress", size: 20 },
      { text: "HTML5/CSS3", size: 15 },
      { text: "AWS Lambda", size: 10 },
      { text: "Full Stack", size: 25 },
      { text: "Serverless Computing", size: 10 },
      { text: "Object-oriented Modeling", size: 10 },
      { text: "Machine Learning", size: 5 },
      { text: "Computer Engineering", size: 5 }
    ];

    // Set up the color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(color => d3.color(color).darker(0.7)));

    // Get the minimum and maximum size values from the word data
    // TODO: Update the font size to be viewport-related instead of its minimum/maximum
    const sizeRange = d3.extent(words, d => d.size);

    // Set up the font size scale based on the size range
    const fontSizeScale = d3.scaleLinear()
      .domain(sizeRange)
      .range([12, 36]); // Adjust the range of font sizes as needed

    // Get the wordCloudContainer element
    const wordCloudContainer = document.getElementById('wordCloudContainer');

    // Set up the word cloud layout
    const layout = d3.layout
      .cloud()
      // TODO: Update the size to dynamically change along with its container size
      .size([wordCloudContainer.clientWidth, 400]) // Set the size of the word cloud container
      .words(words)
      .padding(5) // Adjust the padding between words
      .rotate(0) // Set word rotation angle (in degrees)
      .fontSize(d => fontSizeScale(d.size)) // Scale the font size based on the data range
      .on("end", drawWordCloud);

    // Draw the word cloud
    function drawWordCloud(words) {
      d3.select("#wordCloud")
        .append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", d => d.size + "px")
        .style("fill", (d, i) => colorScale(i))
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
    }

    // Start generating the word cloud layout
    layout.start();

