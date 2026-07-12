import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { journeyStages, readinessTasks } from '../data/portalContent';

export default function TenantJourney() {
	const [selectedStage, setSelectedStage] = useState(journeyStages[0].id);
	const [tasks, setTasks] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem('cdl-readiness-tasks') || '{}');
		} catch {
			return {};
		}
	});

	const stage = useMemo(
		() => journeyStages.find((item) => item.id === selectedStage) || journeyStages[0],
		[selectedStage]
	);
	const completedCount = readinessTasks.filter((task) => tasks[task.id]).length;
	const completion = Math.round((completedCount / readinessTasks.length) * 100);
	const nextTask = readinessTasks.find((task) => !tasks[task.id]);

	const toggleTask = (taskId) => {
		const nextTasks = { ...tasks, [taskId]: !tasks[taskId] };
		setTasks(nextTasks);
		localStorage.setItem('cdl-readiness-tasks', JSON.stringify(nextTasks));
	};

	return (
		<div className="page-stack">
			<section className="panel">
				<div className="section-heading">
					<div>
						<p className="eyebrow">Start Your Tenant Journey</p>
						<h2>Interactive stage tracker from concept planning to operational handover.</h2>
					</div>
					<div className="progress-badge">
						<strong>{completion}%</strong>
						<span>Completion</span>
					</div>
				</div>

				<div className="timeline-grid">
					{journeyStages.map((item) => (
						<button
							key={item.id}
							type="button"
							className={selectedStage === item.id ? 'timeline-card active' : 'timeline-card'}
							onClick={() => setSelectedStage(item.id)}
						>
							<span>{item.number}</span>
							<strong>{item.title}</strong>
							<small>{item.deadline}</small>
						</button>
					))}
				</div>
			</section>

			<section className="panel split-panel aligned-start">
				<div>
					<p className="eyebrow">Selected Stage</p>
					<h3>{stage.title}</h3>
					<p>{stage.overview}</p>
					<div className="stage-meta">
						<span className="info-chip">Target timing: {stage.deadline}</span>
						<span className="info-chip">Documents: {stage.documents.length}</span>
						<span className="info-chip">Templates: {stage.templates.length}</span>
					</div>
					<div className="button-row">
						<Link className="button-link" to="/resources">Open Resources Hub</Link>
						<Link className="button-link button-link-secondary" to="/resources">View Related Documents</Link>
					</div>
				</div>

				<div className="journey-details-grid">
					<article className="detail-card">
						<h4>Requirements</h4>
						<ul className="bullet-list">
							{stage.requirements.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</article>
					<article className="detail-card">
						<h4>Related Documents</h4>
						<ul className="bullet-list">
							{stage.documents.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</article>
					<article className="detail-card">
						<h4>Downloadable Templates</h4>
						<ul className="bullet-list">
							{stage.templates.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</article>
					<article className="detail-card">
						<h4>Manual References</h4>
						<ul className="bullet-list">
							{stage.manualSections.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</article>
				</div>
			</section>

			<section className="panel split-panel aligned-start">
				<div>
					<p className="eyebrow">Tenant Readiness Checklist</p>
					<h3>Interactive checklist with progress tracking and missing-item visibility.</h3>
					<div className="readiness-card">
						<div className="progress-track" aria-hidden="true">
							<div className="progress-bar" style={{ width: `${completion}%` }} />
						</div>
						<p><strong>{completedCount}</strong> of {readinessTasks.length} tasks completed</p>
						<p className="feedback">Next step: {nextTask ? `${nextTask.title} (${nextTask.deadline})` : 'All current tasks completed'}</p>
					</div>
				</div>

				<div className="checklist-grid">
					{readinessTasks.map((task) => (
						<label key={task.id} className={tasks[task.id] ? 'checklist-item active' : 'checklist-item'}>
							<input
								type="checkbox"
								checked={Boolean(tasks[task.id])}
								onChange={() => toggleTask(task.id)}
							/>
							<div>
								<strong>{task.title}</strong>
								<p>{task.stage}</p>
								<span>{task.deadline}</span>
							</div>
						</label>
					))}
				</div>
			</section>
		</div>
	);
}
