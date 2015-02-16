import pprint
import random
#Start by creating a population of organisms, each with two chromosomes encoding selection instructions.
pop = 100
worldsize=1000
pp = pprint.PrettyPrinter(indent=4)
def createPop():
	population = [chomper(1) for count in range(0, 100)]
	print population[5].genome
class chomper():
	id=0
	def __init__(self, genomesize):
		self.genomesize = genomesize
		self.genome = random.choice(["u","d","l","r"])
		self.id = chomper.id
		chomper.id+=1
createPop()