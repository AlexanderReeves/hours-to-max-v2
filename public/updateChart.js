var graphChart = null;
var graphChartData = [];
var graphChartMinZero = true;

function GetCurrentGoalName(){
    return 'max';
}

function UpdateChart(){
    console.log("Updating Chart");
    var now = moment();
    graphChartData = [];

    graphChartData.push({
        x: now.toDate(),
        y: $("#totalXpCompleted").text().trim().slice(0, -1)
    });

    function getYAxisMin(data) {
        if (graphChartMinZero || !Array.isArray(data) || data.length === 0) {
            return 0;
        }

        var minY = data.reduce(function(prev, current) {
            return current && typeof current.y === 'number' && current.y < prev ? current.y : prev;
        }, Number.POSITIVE_INFINITY);

        return minY === Number.POSITIVE_INFINITY ? 0 : minY;
    }

    function renderChart(data) {
        data.sort(function(a,b){
            return new Date(a.x) - new Date(b.x)
        });

        var yMin = getYAxisMin(data);

        // determine raw minimum (ignoring current toggle state) to detect all-100 case
        var rawMin = Number.POSITIVE_INFINITY;
        if (Array.isArray(data) && data.length) {
            rawMin = data.reduce(function(prev, current) {
                return current && typeof current.y === 'number' && current.y < prev ? current.y : prev;
            }, Number.POSITIVE_INFINITY);
        }

        // If every recorded value is 100, force the chart to start at 0 and disable the toggle
        var toggleButton = document.getElementById("graphMinButton");
        if (rawMin === 100) {
            yMin = 0;
            graphChartMinZero = true;
            if (toggleButton) {
                toggleButton.value = "Starting from 0%";
                toggleButton.disabled = true;
            }
        } else {
            if (toggleButton) {
                toggleButton.disabled = false;
            }
        }

        if (graphChart) {
            graphChart.destroy();
        }

        graphChart = new Chart("myChart", {
            type: "line",
            data: {
                datasets: [{
                    label: "Progress %",
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: true,
                    lineTension: 0.2,
                    pointRadius: 4,
                    pointBackgroundColor: "rgb(75, 192, 192)",
                    data: data
                }]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'MMM D'
                            },
                            tooltipFormat: 'll'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: yMin,
                            max: 100,
                            stepSize: 10
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Progress %'
                        }
                    }]
                }
            }
        });

        if (toggleButton) {
            // text already set above for the all-100 case; otherwise reflect current mode
            if (!toggleButton.disabled) {
                toggleButton.value = graphChartMinZero ? "Starting from 0%" : "Starting from lowest value";
            }
        }
    }
    console.log("auth or something");
    var auth = $.cookie("authorization");
    var saveButton = document.getElementById("saveProgressButton");
    var saveResult = document.getElementById("saveProgressResult");

    function disableRecentSaveButton(message) {
        if (saveButton) {
            saveButton.disabled = true;
            saveButton.value = "Progress is saved for this week"
        }
        if (saveResult) {
        }
    }
    
    function enableRecentSaveButton() {
        if (saveButton) {
            saveButton.disabled = false;
            // restore default label
            saveButton.value = "Save this weeks progress point!";
        }
        if (saveResult) {
            saveResult.innerHTML = "&nbsp;";
            saveResult.classList.remove("fail");
            saveResult.classList.remove("success");
        }
    }

    
    if (auth && typeof user !== 'undefined' && user) {
        var currentGoal = GetCurrentGoalName();
        const postData = '&auth=' + auth + '&currentGoal=' + encodeURIComponent(currentGoal) + '&playerId=' + encodeURIComponent(user);
        $.ajax({
            type: "POST",
            url: "/find/snapshots",
            data: postData,
            success: function (data) {
                console.log("retreived data");
                if (data && data.snapshots && data.snapshots.length) {
                    console.log(data);
                    data.snapshots.forEach(function (snapshot) {
                        if (snapshot && snapshot.entryDate != null && snapshot.percentOfGoal != null) {
                            graphChartData.push({
                                x: moment(snapshot.entryDate).toDate(),
                                y: snapshot.percentOfGoal
                            });
                        }
                    });

                    const lastSnapshot = data.snapshots[data.snapshots.length - 1];
                    if (lastSnapshot && moment(lastSnapshot.entryDate).isAfter(moment().subtract(7, 'days'))) {
                        disableRecentSaveButton('Progress for this character has already been saved within the last 7 days.');
                    } else {
                        // enable the save button if the most recent snapshot is older than 7 days
                        enableRecentSaveButton();
                    }
                } else {
                    // no snapshots returned for this goal - allow saving
                    enableRecentSaveButton();
                }
                renderChart(graphChartData);
            },
            error: function () {
                // if fetching snapshots fails, allow saving (don't leave button disabled)
                console.log("no snapshots found");
                enableRecentSaveButton();
                renderChart(graphChartData);
            }
        });
    } else {
        renderChart(graphChartData);
    }
}

function GraphMinToggle() {
    var button = document.getElementById("graphMinButton");
    if (!button) {
        return;
    }

    graphChartMinZero = !graphChartMinZero;
    button.value = graphChartMinZero ? "Starting from 0%" : "Starting from lowest value";

    if (graphChart) {
        var yMin = graphChartMinZero ? 0 : graphChartData.reduce(function(prev, current) {
            return current && typeof current.y === 'number' && current.y < prev ? current.y : prev;
        }, Number.POSITIVE_INFINITY);

        if (yMin === Number.POSITIVE_INFINITY) {
            yMin = 0;
        }

        if (graphChart.options && graphChart.options.scales && graphChart.options.scales.yAxes && graphChart.options.scales.yAxes[0] && graphChart.options.scales.yAxes[0].ticks) {
            graphChart.options.scales.yAxes[0].ticks.min = yMin;
            graphChart.update();
        }
    }
}

function SaveProgress(){
    const auth = $.cookie("authorization");
    const resultElement = document.getElementById("saveProgressResult");
    const button = document.getElementById("saveProgressButton");

    if (!auth) {
        if (resultElement) {
            resultElement.innerHTML = "Please register or sign in before saving progress.";
            resultElement.classList.remove("success");
            resultElement.classList.add("fail");
        }
        return;
    }

    if (!button) {
        return;
    }

    const percentText = $("#totalXpCompleted").text();
    let percentToSave = parseFloat(String(percentText).replace('%', ''));
    if (isNaN(percentToSave) || percentToSave < 0) {
        percentToSave = 0;
    }

    var currentGoal = GetCurrentGoalName();

    const postData = '&auth=' + auth + '&currentGoal=' + encodeURIComponent(currentGoal) + '&percentOfGoal=' + encodeURIComponent(percentToSave) + '&playerId=' + encodeURIComponent(user);

    $.ajax({
        type: "POST",
        url: "/save/progress",
        data: postData,
        success: function (data) {
            if (resultElement) {
                resultElement.innerHTML = 'Progress point saved successfully!';
                resultElement.classList.remove("fail");
                resultElement.classList.add("success");
            }
            button.disabled = true;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (resultElement) {
                resultElement.innerHTML = "Could not save progress. " + (XMLHttpRequest.responseJSON ? XMLHttpRequest.responseJSON.error : errorThrown);
                resultElement.classList.remove("success");
                resultElement.classList.add("fail");
            }
        }
    });
}
