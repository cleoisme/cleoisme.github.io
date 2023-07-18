    // Word data for the word cloud
    const words = [
      { text: "example", size: 30 },
      { text: "Hugo", size: 24 },
      { text: "D3.js", size: 20 },
      { text: "static", size: 18 },
      { text: "website", size: 16 },
      // Add more words and sizes as needed
    ];

    // Set up the color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(color => d3.color(color).darker(0.7)));

    // Set up the word cloud layout
    const layout = d3.layout
      .cloud()
      .size([800, 400]) // Set the size of the word cloud container
      .words(words)
      .padding(5) // Adjust the padding between words
      .rotate(0) // Set word rotation angle (in degrees)
      .fontSize(d => d.size) // Use the 'size' property to determine word font size
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
        .style("fill", (d, i) => colorScale(i)) // Assign different colors with lower saturation
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
    }

    // Start generating the word cloud layout
    layout.start();