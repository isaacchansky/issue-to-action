$(document).ready(function(){
    "use strict";
    var $issueForm = $('[role=issue-form]');
    var $issueResults = $('[role=issue-results]');
    var currentIssue = {
        issue: "",
        audience: "",
        reason: ""
    };

    function showIssueResults() {

        $issueForm.parent().addClass("hidden");
        $issueResults.removeClass("hidden");
        $issueResults.addClass("animated fadeInUp");
    }


    function doIssueResults() {

        $("[role=submitted-issue]").html(currentIssue.issue);
        $("[role=submitted-audience]").html(currentIssue.audience);
        $("[role=submitted-reason]").html(currentIssue.reason);

        var issueTags = currentIssue.issue.split(" ").filter(function(s){ return s.length > 3;});
        var audienceTags = currentIssue.audience.split(" ").filter(function(s){ return s.length > 3;});
        var reasonTags = currentIssue.reason.split(" ").filter(function(s){ return s.length > 3;});

        issueTags.concat(audienceTags).concat(reasonTags).forEach(function(s){
            $("[role=tag-list]").append("<li class='tag'>"+s+"</li>");
        });

        $("[role=agreements]").html("1,242");

        showIssueResults();
    }

    function handleSubmit(e) {

        e.preventDefault();
        var $form = $(e.target),
            $target = $(e.target).parent();

        currentIssue.issue = $form.find('input[name=issue]').val();
        currentIssue.audience = $form.find('input[name=audience]').val();
        currentIssue.reason = $form.find('input[name=reason]').val();

        $target
            .addClass('animated fadeOutUp')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', doIssueResults);
    }



    $issueForm.submit(handleSubmit);


});
