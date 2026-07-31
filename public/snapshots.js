function RenderSnapshotsTable(snapshots){
    var tableBody = $('#snapshotsTableBody');
    tableBody.empty();

    if(!snapshots || snapshots.length === 0){
        tableBody.append('<tr><td colspan="5" style="padding:10px;">No snapshots found.</td></tr>');
        $('#snapshotCount').text('0 snapshots found');
        return;
    }

    $('#snapshotCount').text(snapshots.length + ' snapshots found');

    for(var i = 0; i < snapshots.length; i++){
        var snapshot = snapshots[i];
        var row = $('<tr></tr>');

        var dateText = '';
        if(snapshot.entryDate){
            var dateObj = new Date(snapshot.entryDate);
            dateText = dateObj.toLocaleString();
        }

        row.append($('<td style="padding:8px; border-bottom:1px solid #eee;"></td>').text(dateText));
        row.append($('<td style="padding:8px; border-bottom:1px solid #eee;"></td>').text(snapshot.playerId || ''));
        row.append($('<td style="padding:8px; border-bottom:1px solid #eee;"></td>').text(snapshot.currentGoal || ''));
        row.append($('<td style="padding:8px; border-bottom:1px solid #eee;"></td>').text((snapshot.percentOfGoal || 0) + '%'));

        var actionCell = $('<td style="padding:8px; border-bottom:1px solid #eee;"></td>');
        var deleteButton = $('<button class="colorbutton theme themered" style="font-size:14px;">Delete</button>');
        deleteButton.attr('data-snapshot-id', snapshot._id);
        deleteButton.on('click', function(){
            var snapshotId = $(this).attr('data-snapshot-id');
            DeleteSnapshot(snapshotId);
        });

        actionCell.append(deleteButton);
        row.append(actionCell);
        tableBody.append(row);
    }
}

function LoadSnapshots(){
    var authCode = $.cookie('authorization');

    if(!authCode){
        $('#snapshotsTableBody').html('<tr><td colspan="5" style="padding:10px;">You are not signed in.</td></tr>');
        $('#snapshotCount').text('0 snapshots found');
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/find/all-snapshots',
        data: { authCode: authCode },
        success: function(response){
            RenderSnapshotsTable(response.snapshots);
        },
        error: function(xhr){
            var message = 'Could not load snapshots.';
            if(xhr.responseJSON && xhr.responseJSON.error){
                message = xhr.responseJSON.error;
            }
            $('#snapshotsTableBody').html('<tr><td colspan="5" style="padding:10px;">' + message + '</td></tr>');
            $('#snapshotCount').text('0 snapshots found');
        }
    });
}

function DeleteSnapshot(snapshotId){
    if(!snapshotId){
        return;
    }

    var confirmed = confirm('Delete this snapshot?');
    if(!confirmed){
        return;
    }

    var authCode = $.cookie('authorization');
    if(!authCode){
        alert('You are not signed in.');
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/save/snapshot-delete',
        data: {
            authCode: authCode,
            snapshotId: snapshotId
        },
        success: function(){
            LoadSnapshots();
        },
        error: function(xhr){
            var message = 'Could not delete snapshot.';
            if(xhr.responseJSON && xhr.responseJSON.error){
                message = xhr.responseJSON.error;
            }
            alert(message);
        }
    });
}

window.onload = function(){
    LoadSnapshots();
}
