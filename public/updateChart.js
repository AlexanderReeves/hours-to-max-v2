function UpdateChart(){
    var now = moment();
    var chartData = [];

    chartData.push({
        x: now.toDate(),
        y: percentOfGoal
    });

    function renderChart(data) {
        data.sort(function(a,b){
            return new Date(a.x) - new Date(b.x)
        });

        new Chart("myChart", {
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
                            min: 0,
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
    }

    var auth = $.cookie("authorization");
    var saveButton = document.getElementById("saveProgressButton");
    var saveResult = document.getElementById("saveProgressResult");

    function disableRecentSaveButton(message) {
        if (saveButton) {
            saveButton.disabled = true;
            saveButton.value = "Progress is already saved for this week"
        }
        if (saveResult) {
        }
    }

    if (auth && typeof user !== 'undefined' && user && typeof currentTab !== 'undefined' && currentTab) {
        const postData = '&auth=' + auth + '&currentGoal=' + encodeURIComponent(currentTab) + '&playerId=' + encodeURIComponent(user);
        $.ajax({
            type: "POST",
            url: "/find/snapshots",
            data: postData,
            success: function (data) {
                if (data && data.snapshots && data.snapshots.length) {
                    data.snapshots.forEach(function (snapshot) {
                        if (snapshot && snapshot.entryDate != null && snapshot.percentOfGoal != null) {
                            chartData.push({
                                x: moment(snapshot.entryDate).toDate(),
                                y: snapshot.percentOfGoal
                            });
                        }
                    });

                    const lastSnapshot = data.snapshots[data.snapshots.length - 1];
                    if (lastSnapshot && moment(lastSnapshot.entryDate).isAfter(moment().subtract(7, 'days'))) {
                        disableRecentSaveButton('Progress for this character has already been saved within the last 7 days.');
                    }
                }
                renderChart(chartData);
            },
            error: function () {
                renderChart(chartData);
            }
        });
    } else {
        renderChart(chartData);
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

    const postData = '&auth=' + auth + '&currentGoal=' + encodeURIComponent(currentTab) + '&percentOfGoal=' + encodeURIComponent(percentOfGoal) + '&playerId=' + encodeURIComponent(user);

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
