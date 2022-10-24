version_bot = 1.0.13
version_front = 1.0.14                             

build_bot:
	docker build . -f DockerFile -t cr.yandex/crpsdtfa3vma0tp41r1e/tgbot:$(version_bot)
	docker push cr.yandex/crpsdtfa3vma0tp41r1e/tgbot:$(version_bot)
	kubectl apply -f tgbot.yml

build_front:
	docker build . -f DockerFileFront -t cr.yandex/crpsdtfa3vma0tp41r1e/tgbotfront:$(version_front)
	docker push cr.yandex/crpsdtfa3vma0tp41r1e/tgbotfront:$(version_front)
	kubectl apply -f tgbotfront.yml