
with open('index.html') as f:
    soup = BeautifulSoup(f.read(), features='lxml')

exam_urls = [exam['source_url'] for exam in soup.select('numbas-exam')]

for url in exam_urls:
    path = urlparse(url).path.split('/')[-1]
    print(url, path)
    with requests.get(url) as r:
        with open(Path('numbas-exams') / path, 'w') as f:
            f.write(r.text)

