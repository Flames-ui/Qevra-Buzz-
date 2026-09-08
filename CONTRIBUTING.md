# Contributing to QEVRA Open-Web Discovery

Thank you for your interest in contributing to the **QEVRA Open-Web Discovery** documentation and architectural reference repository!

---

## 1. Scope of Contributions

We welcome contributions from systems engineers, technical writers, open-web researchers, search practitioners, and web developers.

Areas where community contributions are highly valuable:
* **Ranking & Relevance Algorithms**: Proposals for fair domain diversity scoring, freshness decay formulas, and topic extraction mechanics.
* **RSS & Feed Parsing Improvements**: Edge-case handling for malformed RSS/Atom XML feeds, media extraction rules, and deduplication heuristics.
* **Scalability & Benchmarks**: Architectural proposals for candidate set generation, Redis caching strategies, and single-flight request coalescing.
* **Documentation & Technical Writing**: Clarifying architectural explanations, correcting diagrams, or improving technical SEO guides.

---

## 2. Contribution Workflow

```
1. Fork Repository ---> 2. Create Topic Branch ---> 3. Make Edits & Verify ---> 4. Submit Pull Request
```

### Step-by-Step Process

1. **Fork & Clone**: Fork the repository on GitHub and clone it to your local machine.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/relevance-scoring-proposal
   ```
3. **Make Targeted Changes**: Ensure edits maintain high technical accuracy, proper markdown formatting, and clear diagrams (Mermaid format).
4. **Verify Standards**:
   * Ensure no hardcoded secrets, API keys, or private URLs are added.
   * Verify all Mermaid flowcharts render cleanly.
   * Check internal markdown links relative to the repository root.
5. **Commit with Clear Messages**:
   ```bash
   git commit -m "docs: expand candidate set reduction funnel in SCALING.md"
   ```
6. **Submit Pull Request**: Open a Pull Request targeting the `main` branch with a clear description of the proposal or fix.

---

## 3. Code of Conduct

This project enforces the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). All contributors are expected to maintain professional, respectful, and constructive communication.

---

## 4. Key References

* Official Platform: **[QEVRA Platform](https://qevra.buzz)**
* Main Architectural Guide: [ARCHITECTURE.md](./ARCHITECTURE.md)
* Security Policy: [SECURITY.md](./SECURITY.md)
