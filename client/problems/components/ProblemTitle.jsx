// @flow

import React from 'react';
import * as _ from 'lodash';
import {PageHeader, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome from '../../common/components/FontAwesome';
import {Submission} from "../../submissions/domain/Submission";
import Problem from "../domain/Problem";

const ProblemTitle = ({submissions, problem, onShowProblemRanking}: {submissions: Array<Submission>, problem: Problem}) => {
    let acceptedSubmissions = _.filter(submissions,
        (submission: Submission) => submission.statusCode === 'ACCEPTED'
    );
    let failedSubmissions = _.filter(submissions,
        (submission: Submission) => submission.statusCode !== 'ACCEPTED'
    );

    let submittedAcceptedProblems = _.map(acceptedSubmissions, (submission) => submission.problemId);
    let submittedFailedProblems = _.map(failedSubmissions, (submission) => submission.problemId);

    const isSuccess = _.includes(submittedAcceptedProblems, problem.id);
    const isFailure = _.includes(submittedFailedProblems, problem.id);

    let doneCheck = isSuccess
        ? <FontAwesome prefix="fas" name="check-circle" />
        : isFailure
            ? <FontAwesome prefix="fas" name="times-circle" />
            : null;

    const successOrDangerStyle = isSuccess
        ? "text-success"
        : isFailure
            ? "text-danger"
            : "";

    return <PageHeader className={successOrDangerStyle}>
        {problem.title} {doneCheck}
        <Button bsStyle="info"
                className="pull-right"
                onClick={onShowProblemRanking}>
            <FontAwesome prefix="fas" name="trophy" lg={true}/> Problem Ranking
        </Button>
    </PageHeader>;
};

export default ProblemTitle;