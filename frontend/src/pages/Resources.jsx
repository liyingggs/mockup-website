import React, { useEffect, useMemo, useState } from 'react';
import ManualJourneyExplorer from '../components/ManualJourneyExplorer';
import {
	appendices,
	documentResources,
	journeyStages,
} from '../data/portalContent';

const suggestedSearches = ['concept briefing', 'landlord submission', 'contractor onboarding', 'pre-opening handover'];

export default function Resources() {
	const [query, setQuery] = useState('landlord submission');
	const [docs, setDocs] = useState(documentResources);
	const [docsLoading, setDocsLoading] = useState(true);
	const [resourceFilter, setResourceFilter] = useState('All');
	const [resourceView, setResourceView] = useState('downloads');
	const [recentSearches, setRecentSearches] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem('portal-recent-searches') || '[]');
		} catch {
			return [];
		}
	});

	const results = useMemo(() => {
		const normalized = query.toLowerCase();
		const items = [
			...journeyStages.map((stage) => ({
				id: stage.id,
				type: 'Journey Stage',
				title: `${stage.tenancyLabel}: ${stage.title}`,
				body: `${stage.tenancyLabel} ${stage.overview} ${stage.requirements.join(' ')}`,
			})),
			...docs.map((document) => ({
				id: document.id,
				type: 'Resource',
				title: document.name,
				body: `${document.description} ${document.category} ${document.stage}`,
			})),
		];

		return items.filter((item) => `${item.title} ${item.body}`.toLowerCase().includes(normalized));
	}, [docs, query]);

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

	const saveSearch = () => {
		if (!query.trim()) {
			return;
		}

		const next = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 5);
		setRecentSearches(next);
		localStorage.setItem('portal-recent-searches', JSON.stringify(next));
	};

	const categories = useMemo(() => ['All', ...new Set(docs.map((doc) => doc.category || 'General'))], [docs]);
	const filteredDocs = useMemo(() => {
		return docs.filter((doc) => {
			const matchesFilter = resourceFilter === 'All' || (doc.category || 'General') === resourceFilter;
			const haystack = `${doc.name} ${doc.description || ''} ${doc.stage || ''}`.toLowerCase();
			return matchesFilter && haystack.includes(query.toLowerCase());
		});
	}, [docs, query, resourceFilter]);

	return (
		<div className="page-stack">
			<section className="panel">
				<div className="section-heading">
					<div>
						<p className="eyebrow">Resources</p>
						<h2>Search, stage references, downloads, and appendices in one place.</h2>
					</div>
				</div>
				<p className="feedback">Search by stage name, tenancy type, document type, or approval topic across the full 13-stage Retail and Office journeys.</p>
				<div className="toolbar-row">
					<div className="search-bar grow">
						<input
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Search stage names, forms, templates, standards, appendices, and portal guidance"
						/>
					</div>
					<label className="filter-control">
						Category
						<select value={resourceFilter} onChange={(event) => setResourceFilter(event.target.value)}>
							{categories.map((category) => (
								<option key={category} value={category}>{category}</option>
							))}
						</select>
					</label>
					<button type="button" className="button-link" onClick={saveSearch}>Save Search</button>
				</div>
				<div className="chip-row">
					{suggestedSearches.map((item) => (
						<button
							key={item}
							type="button"
							className="chip-button"
							onClick={() => {
								setQuery(item);
								setResourceView('results');
							}}
						>
							{item}
						</button>
					))}
				</div>
				{recentSearches.length > 0 ? (
					<p className="feedback">Recent searches: {recentSearches.join(' | ')}</p>
				) : null}

				<div className="interactive-tabs resources-tabs">
					<div className="tab-list">
						<button
							type="button"
							className={resourceView === 'downloads' ? 'tab active' : 'tab'}
							onClick={() => setResourceView('downloads')}
						>
							Downloads & References
						</button>
						<button
							type="button"
							className={resourceView === 'results' ? 'tab active' : 'tab'}
							onClick={() => setResourceView('results')}
						>
							Search Results
						</button>
					</div>

					<div className="tab-panel resources-panel">
						{resourceView === 'downloads' ? (
							<>
								<div className="section-heading resources-subsection-heading">
									<div>
										<p className="eyebrow">Downloads & References</p>
										<h3>Central repository for forms, standards, templates, and appendices.</h3>
									</div>
								</div>

								{docsLoading ? (
									<p>Loading documents…</p>
								) : filteredDocs.length === 0 ? (
									<p>No documents available. Check back later.</p>
								) : (
									<div className="download-grid">
										{filteredDocs.map((doc) => (
											<article key={doc.id} className="download-card">
												<h3>{doc.name}</h3>
												<p>{doc.description || 'Download the document.'}</p>
												<div className="resource-meta">
													<span>{doc.type || 'Reference'}</span>
													<span>{doc.stage || 'Across all 13 stages'}</span>
												</div>
												<p className="muted">Access method: {doc.access || 'Portal document register'}</p>
											</article>
										))}
									</div>
								)}

								<div className="appendix-panel resources-appendix-panel">
									<p className="eyebrow">Appendices</p>
									<div className="chip-row">
										{appendices.map((item) => (
											<span key={item} className="info-chip">{item}</span>
										))}
									</div>
								</div>
							</>
						) : (
							<>
								<div className="section-heading resources-subsection-heading">
									<div>
										<p className="eyebrow">Search Results</p>
										<h3>{results.length} result{results.length === 1 ? '' : 's'} for "{query}"</h3>
									</div>
								</div>
								<div className="stack-list">
									{results.map((result) => (
										<article key={result.id} className="search-result-card">
											<span className="pill">{result.type}</span>
											<h4>{result.title}</h4>
											<p>{result.body}</p>
										</article>
									))}
									{results.length === 0 ? <p className="empty-state">No matching references found. Try a broader keyword.</p> : null}
								</div>
							</>
						)}
					</div>
				</div>
			</section>

			<section className="panel">
				<div className="section-heading">
					<div>
						<p className="eyebrow">Digital Tenancy Manual</p>
						<h3>Searchable online manual aligned to the 13-stage tenant journey.</h3>
					</div>
					<div className="button-row small-gap">
						<button type="button" className="button-link" onClick={() => window.print()}>Print / Save as PDF</button>
					</div>
				</div>

				<ManualJourneyExplorer />
			</section>

		</div>
	);
}
