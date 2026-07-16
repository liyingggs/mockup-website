import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ManualJourneyExplorer from '../components/ManualJourneyExplorer';
import {
	appendices,
	documentResources,
	journeyStages,
} from '../data/portalContent';

const shortenText = (text = '') => {
	const compact = text.replace(/\s+/g, ' ').trim();
	if (compact.length <= 110) {
		return compact;
	}
	return `${compact.slice(0, 107)}...`;
};

const readNextActionStageNumber = () => {
	try {
		const saved = JSON.parse(localStorage.getItem('portal-workspace-status') || 'null');
		const match = saved?.currentStage?.match(/stage\s+(\d+)/i);
		if (!match) {
			return 1;
		}

		const currentStage = Number(match[1]);
		if (Number.isNaN(currentStage) || currentStage <= 0) {
			return 1;
		}

		return Math.min(currentStage + 1, 13);
	} catch {
		return 1;
	}
};

const isDocumentRelevantToStage = (stageText, targetStageNumber) => {
	if (!stageText) {
		return false;
	}

	if (/across all/i.test(stageText)) {
		return true;
	}

	const matches = stageText.match(/\d+/g);
	if (!matches) {
		return false;
	}

	const numericStages = matches.map((value) => Number(value)).filter((value) => !Number.isNaN(value));
	return numericStages.includes(targetStageNumber);
};

export default function Resources() {
	const [query, setQuery] = useState('');
	const [docs, setDocs] = useState(documentResources);
	const [docsLoading, setDocsLoading] = useState(true);
	const [resourceFilter, setResourceFilter] = useState('All');
	const [resultTypeFilter, setResultTypeFilter] = useState('All');
	const [showOnlyNextAction, setShowOnlyNextAction] = useState(false);
	const hasSearchQuery = query.trim().length > 0;
	const nextActionStageNumber = readNextActionStageNumber();

	const results = useMemo(() => {
		const normalized = query.toLowerCase();
		const items = [
			...journeyStages.map((stage) => ({
				id: stage.id,
				type: 'Journey Stage',
				stageNumber: Number(stage.number),
				title: `${stage.tenancyLabel}: ${stage.title}`,
				body: shortenText(`${stage.tenancyLabel} ${stage.overview}`),
				actionPath: '/journey',
			})),
			...docs.map((document) => ({
				id: document.id,
				type: 'Resource',
				title: document.name,
				body: shortenText(document.description || 'Download the document.'),
				category: document.category || 'General',
				stage: document.stage || 'Across all stages',
				actionPath: document.path || '/contact',
			})),
		];

		if (!hasSearchQuery) {
			return [];
		}

		return items
			.filter((item) => {
				if (normalized && !`${item.title} ${item.body}`.toLowerCase().includes(normalized)) {
					return false;
				}

				if (resultTypeFilter !== 'All' && item.type !== resultTypeFilter) {
					return false;
				}

				if (item.type === 'Resource' && resourceFilter !== 'All' && item.category !== resourceFilter) {
					return false;
				}

				if (showOnlyNextAction) {
					if (item.type === 'Journey Stage' && item.stageNumber !== nextActionStageNumber) {
						return false;
					}

					if (item.type === 'Resource' && !isDocumentRelevantToStage(item.stage, nextActionStageNumber)) {
						return false;
					}
				}

				return true;
			})
			.slice(0, 18);
	}, [docs, hasSearchQuery, nextActionStageNumber, query, resourceFilter, resultTypeFilter, showOnlyNextAction]);

	useEffect(() => {
		setDocsLoading(true);
		fetch('/api/documents')
			.then((response) => response.json())
			.then((data) => {
				if (Array.isArray(data) && data.length > 0) {
					setDocs(data);
				}
			})
			.catch(() => undefined)
			.finally(() => setDocsLoading(false));
	}, []);

	const categories = useMemo(() => ['All', ...new Set(docs.map((doc) => doc.category || 'General'))], [docs]);

	return (
		<div className="page-stack">
			<section className="panel">
				<div className="section-heading">
					<div>
						<p className="eyebrow">Resources</p>
						<h2>Find the next document or stage action in one search.</h2>
					</div>
				</div>
				<div className="search-bar resources-main-search">
						<input
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Search document name, stage, or requirement"
						/>
				</div>

				<details className="resources-filter-dropdown">
					<summary>Filters</summary>
					<div className="resources-filter-grid">
						<label className="filter-control">
							Result Type
							<select value={resultTypeFilter} onChange={(event) => setResultTypeFilter(event.target.value)}>
								<option value="All">All</option>
								<option value="Resource">Resources</option>
								<option value="Journey Stage">Journey Stages</option>
							</select>
						</label>
						<label className="filter-control">
							Category
							<select value={resourceFilter} onChange={(event) => setResourceFilter(event.target.value)}>
								{categories.map((category) => (
									<option key={category} value={category}>{category}</option>
								))}
							</select>
						</label>
						<label className="resources-toggle">
							<input
								type="checkbox"
								checked={showOnlyNextAction}
								onChange={(event) => setShowOnlyNextAction(event.target.checked)}
							/>
							<span>Show only next-action references</span>
						</label>
					</div>
				</details>

				<div className="section-heading resources-subsection-heading">
					<div>
						<p className="eyebrow">Search Results</p>
						<h3>
							{hasSearchQuery
								? `${results.length} result${results.length === 1 ? '' : 's'}`
								: 'Enter a keyword to see relevant results'}
						</h3>
					</div>
				</div>

				{docsLoading ? <p>Loading documents...</p> : null}
				{hasSearchQuery ? (
					<div className="resources-results-list">
						{results.map((result) => (
							<article key={result.id} className="resource-result-row">
								<div>
									<p className="resource-result-type">{result.type}</p>
									<h4>{result.title}</h4>
									<p className="single-line">{result.body}</p>
								</div>
								<div className="resource-result-actions">
									{result.type === 'Journey Stage' ? (
										<Link className="button-link" to={result.actionPath}>Continue</Link>
									) : result.actionPath === '/contact' ? (
										<Link className="button-link" to="/contact">Request File</Link>
									) : (
										<a className="button-link" href={result.actionPath}>Download</a>
									)}
								</div>
							</article>
						))}
						{results.length === 0 ? <p className="empty-state">No matching references found. Try a broader keyword.</p> : null}
					</div>
				) : (
					<div className="resources-empty-state">
						<p className="empty-state">Start typing a keyword to find relevant stages and resources.</p>
						<button type="button" className="button-link" onClick={() => setQuery('landlord submission')}>Start With Landlord Submission</button>
					</div>
				)}

				<p className="feedback resources-appendix-line">Appendices: {appendices.slice(0, 4).join(' | ')}</p>
			</section>

			<section className="panel">
				<div className="section-heading">
					<div>
						<p className="eyebrow">Digital Tenancy Manual</p>
						<h3>Searchable online manual aligned to the 13-stage tenant journey.</h3>
					</div>
				</div>
				<div className="manual-download-card">
					<div className="manual-info">
						<p className="eyebrow">Full Manual</p>
						<h3>Download the complete Digital Tenancy Manual</h3>
						<p>
							Includes all 13 Retail and Office journey stages, requirements, standards, and appendices.
							</p>
							</div>
							<a
							href="/manual.pdf"
							download="Digital-Tenancy-Manual.pdf"
							className="download-manual-btn">
								<svg className="download-btn-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
									<path d="M8 2v7m0 0 3-3m-3 3-3-3M3 12h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span>Download PDF</span>
								</a> </div>
				<ManualJourneyExplorer />
			</section>

		</div>
	);
}
